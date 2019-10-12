from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.views import APIView
from rest_framework.response import Response
from account.user_serializer import user_serializer
from account.models import UserProfile
from props.models import Props, Value, Value2User
from photo.models import UserPhoto

# Create your views here.
class GalleryListView(APIView):
    """
       Get gallery
    """
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        profile = request.user.userprofile
        if profile.gender == 'male':
            users = UserProfile.objects.filter(gender='female').order_by('-id')
        else:
            users = UserProfile.objects.filter(gender='male').order_by('-id')
        
        out = {
            'ids': [],
            'results': {}
        }
        for user in users:
            out['ids'].append(user.id)
            out['results'][user.id] = user_serializer(user) 
        return Response(out)        

class GalleryDetailView(APIView):
    """
       Get gallery detail
    """
    permission_classes = (IsAuthenticated,)
    def get(self, request, id, format=None):
        out = {'props': [], 'gallery': []}
        profile = UserProfile.objects.get(pk=id)
        out['user'] = user_serializer(profile)
        props = Props.objects.filter(for_woman=True)
        for p in props:
            try:
                v = Value2User.objects.get(user=profile, prop=p)
                value = v.value.name
            except:
                value = 'none'
            out['props'].append({'name': p.name, 'value': value})
        gallery = UserPhoto.objects.filter(user=profile, is_approved=True, is_main=False)
        for g in gallery:
            out['gallery'].append({'image': g.image_middle})
        #print(gallery)
        return Response(out)