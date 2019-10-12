from django.contrib import admin

# Register your models here.

from .models import ChatMessage, ChatRoom, ChatContact

class ChatRoomAdmin(admin.ModelAdmin):
    list_display = ['id', 'created_at', 'is_active', 'is_answered', 'is_low_account', 'activity']
    list_filter = ['is_active', 'is_answered']
admin.site.register(ChatRoom, ChatRoomAdmin)

class ChatContactAdmin(admin.ModelAdmin):
    list_display = ['room', 'owner', 'abonent', 'created_at']
admin.site.register(ChatContact, ChatContactAdmin)

class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['room', 'user', 'message']
admin.site.register(ChatMessage, ChatMessageAdmin)