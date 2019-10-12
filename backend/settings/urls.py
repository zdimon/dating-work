from django.urls import path, include
from .views import *
from rest_framework import routers
from .views import ReplanishmentPlanView, AddCreditsView, SmilesListView



urlpatterns = [
    path('plan', ReplanishmentPlanView.as_view(), name="settings-plan"),
    path('add/credits', AddCreditsView.as_view(), name="settings-add-credits"),
    path('smiles', SmilesListView.as_view(), name="settings-smiles"),
]
