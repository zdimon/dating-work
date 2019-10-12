from django.urls import path, include
from .views import *
from rest_framework import routers
from .views import RoomList, AddRoomView, SelectRoomView, StopRoomView



urlpatterns = [
    path('message', SendMessageView.as_view(), name="room-send-message"),
    path('add', AddRoomView.as_view(), name="room-add"),
    path('list', RoomList.as_view(), name="room-list"),
    path('select/<int:room_id>', SelectRoomView.as_view(), name="room-select"),
    path('stop', StopRoomView.as_view(), name="room-resume"),

]
