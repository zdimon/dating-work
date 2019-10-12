from django.core.management.base import BaseCommand, CommandError
from account.models import UserProfile
from photo.models import UserPhoto
from django.contrib.auth.models import User
from backend.settings import DOMAIN, BASE_DIR
from django.core.files import File
import random
from django.utils.dateparse import parse_date

def load_photo(userprofile,number):
    print('Loading...%s' % userprofile)
    p = UserPhoto()
    p.user = userprofile
    p.is_approved = True
    p.is_main = True
    if userprofile.gender == 'male':
        filepath = BASE_DIR+'/test_data/images/m%s.jpeg' % number
    else:
        filepath = BASE_DIR+'/test_data/images/w%s.jpeg' % number
    with open(filepath, 'rb') as image:
        p.image.save('%s.jpeg'% userprofile.id, File(image), save=True)
    p.save()

def users_fabric(name,gender,is_superuser):
        print('Creating....%s' % name)
        u = UserProfile()
        u.username = name
        u.gender = gender
        u.set_password(name)
        u.is_active = True
        u.is_staff = True
        u.email = '%s@gmail.com' % name
        u.is_superuser = is_superuser
        u.about_me = 'I am %s' % 'admin'
        bd = '1978-%s-01' % random.randint(1,12)
        u.birthday = parse_date(bd)
        u.hight = 160
        u.save()
        return u

class Command(BaseCommand):
    'Import test users into DB'
    help = 'Import test users into DB'
    def handle(self, *args, **options):
        print('Importing users...')
        User.objects.all().delete()
        admin = users_fabric('admin','male',True)
        load_photo(admin,1)
        for i in range(1,10):
            name = 'man%s' % i
            profile = users_fabric(name,'male',False)
            load_photo(profile,i)
        for i in range(1,10):
            name = 'woman%s' % i
            profile = users_fabric(name,'female',False)
            load_photo(profile,i)