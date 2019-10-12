from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from account.models import UserProfile
from account.serializers import UserSerializer
from rest_framework import generics
from .models import UserOnline
import redis
import json
redis_client = redis.Redis(host='localhost', port=6379, db=4)

class UserOnlineViewset(generics.ListAPIView):
    serializer_class = UserSerializer
    model = serializer_class.Meta.model
    paginate_by = 100
    def get_queryset(self):
        queryset = self.model.objects.filter(is_online=True)
        return queryset.order_by('-id')


class UpdateSocketIdView(APIView):
    """
       Updating socket id by token
    """
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        #print(request.data)
        token = request.data['token']
        socket_id = request.data['socket_id']
        agent = request.META['HTTP_USER_AGENT']
        profile = request.user.userprofile
        profile.set_online()
        try:
            uo = UserOnline.objects.get(token=token,agent=agent)
            uo.sid = socket_id
            uo.save()
        except Exception as e:
            print('Can not update socket ID %s %s create a new one' % (socket_id, e))
            uo = UserOnline()
            uo.sid = socket_id
            uo.token = token
            uo.agent = agent
            uo.user = request.user
            uo.save()
        
        #redis_client.publish('notifications',json.dumps({'task': 'user_online'}))
        return Response({'status': 0, 'message': 'OK'})

class UserOnlineListView(APIView):
    """
       List of users online
    """
    permission_classes = (AllowAny,)
    def get(self, request, format=None):
        users_ids = []
        users = {}
        userlist = UserProfile.objects.filter(is_online=True)
        for u in userlist:
            users_ids.append(u.id)

        for u in userlist:
            users[u.id] = UserSerializer(u,context={'request': request}).data   
        return Response({'users_ids': users_ids, 'users': users})  