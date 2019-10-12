from django.urls import path, include
from .views import *
from rest_framework import routers
from .views import MessageListView



urlpatterns = [
    path('list', MessageListView.as_view(), name="message-list"),
]
