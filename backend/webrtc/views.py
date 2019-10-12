from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import redis
from rest_framework.views import APIView
from .models import Offer, Ice
import json
from room.models import ChatRoom
from online.models import UserOnline
redis_client = redis.Redis(host='localhost', port=6379, db=4)
# Create your views here.
class OfferView(APIView):
    """
       Get offer
    """
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        print(request.data)
        room = ChatRoom.objects.get(pk=request.data['room_id'])
        o = Offer()
        o.user = request.user.userprofile
        o.offer = json.dumps(request.data['offer'])
        o.room = room
        o.save()
        abonent = room.get_abonent(request.user)
        for uo in UserOnline.objects.filter(user=abonent):
            data = {
                'task': 'put_to_socket', 
                'data': {
                    'action': 'server-action:put_offer',
                    'offer': request.data['offer'],
                    'room_id': room.id,
                    'socket_id': uo.sid
                    }
                }
            redis_client.publish('notifications',json.dumps(data))
        print(abonent)
        return Response({'offer': 'ok'})

class AnswerView(APIView):
    """
       Get offer
    """
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        print(request.data)
        room = ChatRoom.objects.get(pk=request.data['room_id'])
        o = Offer()
        o.user = request.user.userprofile
        o.offer = json.dumps(request.data['offer'])
        o.room = room
        o.save()
        abonent = room.get_abonent(request.user)
        for uo in UserOnline.objects.filter(user=abonent):
            data = {
                'task': 'put_to_socket', 
                'data': {
                    'action': 'server-action:put_answer',
                    'offer': request.data['offer'],
                    'room_id': room.id,
                    'socket_id': uo.sid
                    }
                }
            redis_client.publish('notifications',json.dumps(data))
        print(abonent)
        return Response({'answer': 'ok'})


class IceView(APIView):
    """
       Get ice
    """
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        print(request.data)
        room = ChatRoom.objects.get(pk=request.data['room_id'])
        abonent = room.get_abonent(request.user)
        for uo in UserOnline.objects.filter(user=abonent):
            data = {
                'task': 'put_to_socket', 
                'data': {
                    'action': 'server-action:put_ice',
                    'ice': request.data['ice'],
                    'room_id': room.id,
                    'socket_id': uo.sid
                    }
                }
            redis_client.publish('notifications',json.dumps(data))
        print(abonent)
        return Response({'ice': 'ok'})