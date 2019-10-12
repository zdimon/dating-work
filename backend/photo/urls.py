from django.urls import path, include
from .views import *
from rest_framework import routers
from .views import UserPhotoViewSet, AddView, SetMainView, PhotoListView , DeleteView
router = routers.DefaultRouter()



urlpatterns = [

    path('save/webcam/image', SaveWebcamImage.as_view()),
    path('add/image', AddView.as_view()),
    path('setmain', SetMainView.as_view(), name='photo-setmain'),
    path('list', PhotoListView.as_view(), name='photo-list'),
    path('delete', DeleteView.as_view(), name='photo-delete'),
    path('crop', CropView.as_view(), name='photo-crop'),
]
