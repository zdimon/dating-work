from django.contrib import admin
from image_cropping import ImageCroppingMixin

# Register your models here.
from .models import UserPhoto
# Register your models here.
class UserPhotoAdmin(ImageCroppingMixin, admin.ModelAdmin):
    list_editable = ('is_approved',)
    list_filter = ['is_approved', 'is_deleted']
    list_display = ['get_small_img', 'get_middle_img', 'user', 'is_main', 'is_deleted', 'is_approved']
    exclude = ['croppos']
admin.site.register(UserPhoto, UserPhotoAdmin)