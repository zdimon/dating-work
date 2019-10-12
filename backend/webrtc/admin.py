from django.contrib import admin
from .models import Offer, Ice
# Register your models here.

class OfferAdmin(admin.ModelAdmin):
    list_display = ['user', 'room', 'offer']

admin.site.register(Offer, OfferAdmin)



class IceAdmin(admin.ModelAdmin):
    list_display = ['offer', 'ice']

admin.site.register(Ice, IceAdmin)