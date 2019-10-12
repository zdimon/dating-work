
from moderation.models import Moderation
from django.utils.safestring import mark_safe



def moderate_new(photo):
    m = Moderation()
    m.type_obj = 'photo-new'
    m.name = 'New photo moderation'
    m.content_object = photo
    m.save()

def moderate_delete(photo):
    m = Moderation()
    m.type_obj = 'photo-delete'
    m.name = 'Delete photo moderation'
    m.content_object = photo
    m.save()


def show_photo(photo):
    return mark_safe('<img width="200" src="%s">' % photo.image.url)

def approve_photo(obj):
    photo = obj.content_object
    photo.is_approved = True
    photo.save()
    obj.delete()

def disapprove_photo(obj):
    photo.delete()
    obj.delete()

def delete_photo(obj):
    photo = obj.content_object
    photo.delete()
    obj.delete()

def notdelete_photo(obj):
    photo = obj.content_object
    photo.is_deleted = False
    photo.save()
    obj.delete()
