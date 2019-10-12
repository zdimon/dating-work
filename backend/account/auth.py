from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import generics
from .models import UserProfile
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .serializers import UserSerializer
from online.models import UserOnline
from online.utils import set_user_offline, set_user_online
from .user_serializer import user_serializer

class LogoutView(APIView):
    permission_classes = (AllowAny,)
    def get(self,request):
        if request.user.is_authenticated:
            token, created = Token.objects.get_or_create(user=request.user)
            set_user_offline({'token': token, 'user': request.user.userprofile})
        else:
            print("User is not authenticated!")
        return Response({'status': 0, 'message': 'Ok'})

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        profile = user.userprofile
        profile.set_online()
        token, created = Token.objects.get_or_create(user=user)
        data = {
            'token': token, 
            'socket_id': request.data['socket_id'], 
            'language': profile.language,
            'agent':request.META['HTTP_USER_AGENT'],
            'user': profile
        }
        set_user_online(data)
        
        return Response({
            'token': token.key,
            'agent': request.META['HTTP_USER_AGENT'],
            'user': user_serializer(profile),
            'sid':  request.data['socket_id']
        })