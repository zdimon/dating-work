from django.contrib.auth.models import User
from .models import ChatRoom, ChatMessage
from rest_framework import serializers
from account.serializers import UserSerializer

class MessageSerializer(serializers.ModelSerializer):
    #user = UserSerializer(read_only=True)


    class Meta:
        model = ChatMessage
        fields = ['id', 'message']
        #depth = 2

class RoomSerializer(serializers.ModelSerializer):
    messages = serializers.SerializerMethodField('mesages_func')
    def mesages_func(self,obj):
        msg = []
        for m in ChatMessage.objects.filter(room=obj):
            msg.append(MessageSerializer(m).data)
        return msg

    class Meta:
        model = ChatRoom
        fields = ['id', 'messages']

