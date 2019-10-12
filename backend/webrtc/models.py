from django.db import models
from account.models import UserProfile
from room.models import ChatRoom
# Create your models here.
class Offer(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, null=True)
    offer = models.TextField(default='')


class Ice(models.Model):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE)
    ice = models.TextField(default='')