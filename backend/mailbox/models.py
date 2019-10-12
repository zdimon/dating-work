from django.db import models
from account.models import UserProfile


class Messages(models.Model):
    from_user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, related_name="from_user")
    to_user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, related_name="to_user")
    content = models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)    


    
# Create your models here.
