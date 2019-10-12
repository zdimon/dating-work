from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
import base64
from django.core.files.base import ContentFile
import random
from .models import UserPhoto 
from .serializers import UserPhotoSerializer
from rest_framework import viewsets
from backend.local import DOMAIN
from moderation.utils.photo import moderate_delete, moderate_new


def serialize_photos(request):
    photos = UserPhoto.objects.filter(user=request.user.userprofile).order_by('-id')
    out = {
        'ids': [],
        'results': {}
    }
    for photo in photos:
        out['ids'].append(photo.id)
        out['results'][photo.id] = UserPhotoSerializer(photo).data 
    return out

class PhotoListView(APIView):
    permission_classes = (IsAuthenticated,)
    """
       List of users photo
    """
    def get(self, request, format=None):
        return Response(serialize_photos(request))


class UserPhotoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that manages with user`s photo.
    """
    permission_classes = (IsAuthenticated,)
    queryset = UserPhoto.objects.all().order_by('-id')
    serializer_class = UserPhotoSerializer
    def get_queryset(self):
        #if self.request.user.is_superuser:
        #    return UserPhoto.objects.all()
        return UserPhoto.objects.filter(user=self.request.user.userprofile)


class SaveWebcamImage(APIView):
    permission_classes = (IsAuthenticated,)
    """
       Saving image from web camera
    """
    def post(self, request, format=None):
        #print(request.user.userprofile)
        format, imgstr = request.data.get('imgBase64').split(';base64,')
        ext = format.split('/')[-1]
        data = ContentFile(base64.b64decode(imgstr))  
        file_name = '%s-%s.%s' % (request.user.id,random.randint(111,999),ext)
        #print(file_name)
        c = UserPhoto()
        c.user = request.user.userprofile
        c.image.save(file_name, data, save=True)
        c.save() 
        moderate_new(c)
        return Response(serialize_photos(request))


class AddView(APIView):
    permission_classes = (IsAuthenticated,)
    """
       Saving image from file input
    """
    def post(self, request, format=None):
        profile = request.user.userprofile
        c = UserPhoto()
        c.user = request.user.userprofile
        c.image.save(str(profile.id)+request.data['myfile'].name, request.data['myfile'], save=True)
        c.save() 
        moderate_new(c)
        return Response({'status': 'ok'}) 

class SetMainView(APIView):
    permission_classes = (IsAuthenticated,)
    """
       Set photo as main
    """
    def post(self, request, format=None):
        try:
            photo = UserPhoto.objects.get(pk=request.data['payload']['id'])
            photo.setAsMain()
            return Response(serialize_photos(request))
        except Exception as e:
            return Response({'status': 1, 'message': str(e)})

class DeleteView(APIView):
    permission_classes = (IsAuthenticated,)
    """
       Delete photo (mark as deleted)
    """
    def post(self, request, format=None):
        try:
            photo = UserPhoto.objects.get(pk=request.data['payload']['id'])
            photo.is_deleted = True
            photo.is_moderated = False
            photo.save()
            moderate_delete(photo)
            return Response({'status': 0, 'message': 'Ok'})
        except Exception as e:
            return Response({'status': 1, 'message': str(e)})

class CropView(APIView):
    permission_classes = (IsAuthenticated,)
    """
       Crop photo 
    """
    def post(self, request, format=None):
        photo = UserPhoto.objects.get(pk=request.data['id'])
        print(request.data['imgpos'])
        print(request.data['croppos'])
        cropping = '%s,%s,%s,%s' % (request.data['imgpos']['x1'],request.data['imgpos']['y1'],request.data['imgpos']['x2'],request.data['imgpos']['y2'])
        croppingpos = '%s,%s,%s,%s' % (request.data['croppos']['x1'],request.data['croppos']['y1'],request.data['croppos']['x2'],request.data['croppos']['y2'])
        photo.cropping = cropping
        photo.croppos = croppingpos
        photo.save()
        photo.update_thumbs()
        return Response({photo.id: UserPhotoSerializer(photo).data})
