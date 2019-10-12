from django.contrib import admin

from .models import UserOnline
# Register your models here.
class UserOnlineAdmin(admin.ModelAdmin):
    list_display = ['user', 'sid', 'token', 'agent', 'activity']

admin.site.register(UserOnline, UserOnlineAdmin)
