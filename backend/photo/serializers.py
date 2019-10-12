from django.contrib.auth.models import User
from .models import UserPhoto
from rest_framework import serializers


class UserPhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserPhoto
        fields = [
        'id',
        'user', 
        'image_big', 
        'image_middle', 
        'image_small', 
        'is_main', 
        'cropping',
        'is_approved',
        'is_deleted',
        'croppos'
        ]
