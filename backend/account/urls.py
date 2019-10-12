from django.urls import path, include
from .views import *
from rest_framework import routers
from .views import AddCretitsView, RegisterWoman, SetLanguageView, RegisterAgencyView



urlpatterns = [
    path('add', AddCretitsView.as_view(), name="account-add-credits"),
    path('register/woman', RegisterWoman.as_view(), name="account-register-woman"),
    path('register/agency', RegisterAgencyView.as_view(), name="account-register-agency"),
    path('setlanguage/<str:language>', SetLanguageView.as_view(), name="account-set-language")
]
