from django.shortcuts import render
from rest_framework import viewsets
from .models import ChatRoom, ChatMessage, ChatContact
from .serializers import RoomSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from account.models import UserProfile
from account.serializers import UserSerializer
from .tasks import sent_chat_message
from .rooms_serializer import serialize_rooms, detail_room, serialize_message, serialize_messages_by_room
import time
from .utils import check_man_account, send_notification_to_woman
# Create your views here.

class RoomViewSet(viewsets.ModelViewSet):
    """
    API endpoint for rooms.
    """
    queryset = ChatRoom.objects.all().order_by('-id')
    serializer_class = RoomSerializer

class SendMessageView(APIView):
    """
       Send message to room
    """
    def post(self, request, format=None):
        print(request.data)
        user = UserProfile.objects.get(id=request.data['author']['id'])
        room = ChatRoom.objects.get(pk=request.data['room_id'])


        #if check_man_account(room):
        m = ChatMessage()
        m.message = request.data['message']
        m.room = room
        m.user = user
        m.save()
        room.check_is_active_by_message(m)
        #sent_chat_message.delay(detail_room(room,request.user.userprofile))
        sent_chat_message(room)
        #else:
        #    send_notification_to_woman(room)

        #out = {
        #    'room_id': room.id,
        #    'messages': serialize_messages_by_room(room),
        #}
        return Response(detail_room(room,request.user.userprofile))





class SelectRoomView(APIView):
    """
       Select room from contact
    """
    def get(self, request, room_id, format=None):
        #print(room_id)
        room = ChatRoom.objects.get(pk=room_id)
        owner = request.user.userprofile
        c = ChatContact.objects.get(owner=owner,room=room)
        c.set_current() 
        return Response(serialize_rooms(request.user.userprofile))

class AddRoomView(APIView):
    """
       Add room or return existed
    """
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        print(request.data)
        owner = UserProfile.objects.get(id=request.data['owner'])
        abonent = UserProfile.objects.get(id=request.data['abonent'])
        room = ChatRoom.get_room_or_create(owner,abonent)
        return Response(detail_room(room,request.user.userprofile))
        


class RoomList(APIView):
    """
       List of rooms
    """
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None): 
        return Response(serialize_rooms(request.user.userprofile))

from payment.tasks import send_update_room

class StopRoomView(APIView):
    """
       Stop room
    """
    def post(self, request, format=None):
        print(request.data)
        room = ChatRoom.objects.get(pk=request.data['id'])
        room.close_room_by_stop_button()
        send_update_room(room)
        return Response({'status': 0})