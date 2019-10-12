from django.db import models
from django.utils.translation import ugettext_lazy as _
from django_countries.fields import CountryField
from django.contrib.auth.models import User
from backend.settings import LANGUAGES
from online.models import UserOnline
from django.utils.safestring import mark_safe
from backend.settings import DOMAIN
import redis
import json
redis_client = redis.Redis(host='localhost', port=6379, db=4)
from .user_serializer import user_serializer
from datetime import date
from settings.models import ReplanishmentPlan
from .utils import zodiac_sign


class UserProfile(User):

    GENDER = (
        ('male', _('Man')),
        ('female', _('Woman'))
    )
    about_me = models.TextField(
        help_text=_('About me'), 
        verbose_name=_('About me'))

    language = models.CharField(
        verbose_name=_('Language'),
        choices=LANGUAGES,
        default='en',
        max_length=2)

    gender = models.CharField(
        verbose_name=_('Gender'),
        choices=GENDER,
        db_index=True,
        default='male',
        max_length=6)
    
    is_online = models.BooleanField(default=False)
    account = models.IntegerField(default=0)
    birthday = models.DateField(default='1999-01-01')
    lookingfor = models.TextField(default='')
    goal = models.TextField(default='')
    job = models.TextField(default='')
    city = models.CharField(default='', max_length=250)
    zodiac = models.CharField(default='', max_length=50)

    def save(self, *args, **kwargs):
        self.zodiac = zodiac_sign(self)
        super(UserProfile, self).save(*args, **kwargs)

    def get_agency(self):
        from agency.models import Agency2Woman
        if self.gender=='female':
            try:
                a2w = Agency2Woman.objects.get(woman=self)
                return a2w.agency
            except:
                return None
        return None


    @property
    def age(self):
        today = date.today()
        return today.year - self.birthday.year - ((today.month, today.day) < (self.birthday.month, self.birthday.day))

    @property
    def zodiac_icon(self):
        return mark_safe('<img width="60" src="/static/images/icons/zodiac/%s.png" />' % self.zodiac)


    #@property
    #def zodiak(self):
    #    return zodiac_sign(self.birthday)

    #def make_zodiak(self):
    #    self.zodiac = zodiac_sign(self)
    #    self.save()


    @staticmethod
    def get_user_by_name(name):
        try:
            return UserProfile.objects.get(username=name)
        except Exception as Err:
            print(Err)
            return None
            
    @property
    def main_photo(self):
        from photo.models import UserPhoto
        try:
            photo = UserPhoto.objects.get(user=self,is_main=True)
            return photo.image_small

        except Exception as Err:
            return DOMAIN+'/static/images/empty_%s.jpeg' % self.gender

    @property
    def middle_photo(self):
        from photo.models import UserPhoto
        try:
            photo = UserPhoto.objects.get(user=self,is_main=True)
            return photo.image_middle
        except Exception as Err:
            return DOMAIN+'/static/images/empty_%s.jpeg' % self.gender
        
    @property
    def admin_icon(self):    
        return mark_safe("""<img width="60" src="%s" />""" % self.main_photo)

    def get_socket_ids(self):
        return UserOnline.objects.filter(user=self)

    def set_offline(self):
        self.is_online = False
        self.save()
        data = {
            'task': 'user_offline',
            'user': {self.id: user_serializer(self)}
        }
        redis_client.publish('notifications', json.dumps(data))

    def set_online(self):
        self.is_online = True
        self.save()
        data = {

        'task': 'user_online',
        'user': {self.id: user_serializer(self)}
        }
        redis_client.publish('notifications', json.dumps(data))


class ReplenishmentLog(models.Model):
    user_profile = models.ForeignKey(UserProfile, default='', on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    plan = models.ForeignKey(ReplanishmentPlan, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.user_profile.email
