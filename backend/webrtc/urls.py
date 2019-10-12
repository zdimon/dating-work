from django.urls import path, include
from .views import *
from rest_framework import routers
from .views import OfferView, AnswerView



urlpatterns = [

    path('offer', OfferView.as_view(), name="webrtc-offer"),
    path('answer', AnswerView.as_view(), name="webrtc-answer"),
    path('ice', IceView.as_view(), name="webrtc-ice"),
    
]
