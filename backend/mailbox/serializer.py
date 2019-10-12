
from .models import Messages
from rest_framework import serializers
from account.serializers import UserSerializer

class MailboxSerializer(serializers.ModelSerializer):
    from_user_test = serializers.SerializerMethodField('from_user_func',)
   
    def from_user_func(self,obj):
        return UserSerializer(obj.from_user).data 
    class Meta:
        model = Messages
        fields = ['from_user_test', 'to_user', 'content']
        depth = 2

def serialize_list(request):
    user = request.user.userprofile
    out = {
        'ids': [],
        'messages' : {}
    }
    for m in Messages.objects.filter(from_user=user):
        out['messages']['id'] = MailboxSerializer(m).data
    return out
