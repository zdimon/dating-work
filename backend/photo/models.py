from django.db import models
from account.models import UserProfile
from image_cropping.fields import ImageRatioField, ImageCropField
from django.utils.safestring import mark_safe
from easy_thumbnails.files import get_thumbnailer
from backend.local import DOMAIN
from django.dispatch import receiver
# Create your models here.
class UserPhoto(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    image = ImageCropField(blank=True, upload_to='user_photo')
    cropping = ImageRatioField('image', '100x100')
    is_main = models.BooleanField(default=False)
    is_approved = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    croppos = models.CharField(default='', max_length=250)

    def setAsMain(self):
        UserPhoto.objects.filter(user=self.user).update(is_main=False)
        self.is_main = True
        self.save()

    def get_small_url(self):
        return get_thumbnailer(self.image).get_thumbnail({
            'size': (50, 50),
            'box': self.cropping,
            'crop': 'smart',
            'upscale': True,

        }).url

    @property
    def get_small_img(self):
        return mark_safe('<img src="%s" />' % self.get_small_url())

    def get_middle_url(self):
        return get_thumbnailer(self.image).get_thumbnail({
            'size': (200, 200),
            'box': self.cropping,
            'crop': 'smart',
            'upscale': True,

        }).url
       
    @property
    def get_middle_img(self):
        return mark_safe('<img src="%s" />' % self.get_middle_url())

    def __str__(self):
        thumbnail_url = get_thumbnailer(self.image).get_thumbnail({
            'size': (50, 50),
            'box': self.cropping,
            'crop': 'smart',
            'upscale': True,
        }).url
        return mark_safe('<img src="%s" />' % thumbnail_url)

    def update_thumbs(self):
        self.get_small_url()
        self.get_middle_url()
        

    @property
    def image_big(self):
        return '%s%s' % (DOMAIN,self.image.url)

    @property
    def image_middle(self):
        url = get_thumbnailer(self.image).get_thumbnail({
            'size': (200, 200),
            'box': self.cropping,
            'crop': 'smart',
            'upscale': True,
        }).url
        #return url
        return '%s%s' % (DOMAIN,url)

    @property
    def image_small(self):
        url = get_thumbnailer(self.image).get_thumbnail({
            'size': (80, 80),
            'box': self.cropping,
            'crop': 'smart',
            'upscale': True,
        }).url
        #return url
        return '%s%s' % (DOMAIN,url)

@receiver(models.signals.post_delete, sender=UserPhoto)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """Deletes file from filesystem
    when corresponding `ImageModel` object is deleted.
    """
    if instance.image:
        print('Deleting thumbs!')
        thumbmanager = get_thumbnailer(instance.image)
        thumbmanager.delete(save=False)