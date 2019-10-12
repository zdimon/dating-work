from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    is_edit = serializers.SerializerMethodField('is_edit_func')
   
    def is_edit_func(self,foo):
        return False 

  

    class Meta:
        model = UserProfile
        fields = ['id','url', 'account', 'username', 'email', 'groups', 'is_superuser', 'is_edit', 'main_photo', 'is_online']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['about_me', 'hight', 'gender']