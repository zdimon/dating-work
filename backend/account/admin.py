from django.contrib import admin
from .models import UserProfile, ReplenishmentLog


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):

    list_display = ['username','is_online', 'gender', 'admin_icon', 'age', 'zodiac_icon', 'birthday']
    list_filter = ['is_online', 'gender']


@admin.register(ReplenishmentLog)
class ReplenishmentAdmin(admin.ModelAdmin):
    list_display = ['user_profile', 'plan', 'creation_date']

