from django.urls import path, include
from .views import *
from rest_framework import routers
from .views import GalleryListView, GalleryDetailView



urlpatterns = [

    path('list', GalleryListView.as_view(), name="gallery-list"),
    path('detail/<str:id>', GalleryDetailView.as_view(), name="gallery-detail"),

]
