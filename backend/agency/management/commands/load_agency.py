from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from backend.settings import DOMAIN, BASE_DIR
from django.core.files import File
from agency.models import Agency, Agency2Woman, AgencyFiles
from account.models import UserProfile

def load_photo(userprofile,number):
    print('Loading...%s' % userprofile)
    p = UserPhoto()
    p.user = userprofile
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
        u.hight = 160
        u.save()
        return u

def add_w(from_user,to_user, agency):
    for i in range(from_user,to_user):
        username = 'woman%s' % i
        profile = UserProfile.objects.get(username=username)
        print('Adding....%s' % profile)
        a2w = Agency2Woman()
        a2w.woman = profile
        a2w.agency = agency
        a2w.save()

class Command(BaseCommand):
    'Import agencies into DB'
    def handle(self, *args, **options):
        print('Importing agencies into DB...')
        Agency.objects.all().delete()
        a = Agency()
        a.username = 'agency1'
        a.name = 'Baba Svaha'
        a.director = 'Ivanova Sveta'
        a.login = 'agency1'
        a.adress = 'kutuzova 7'
        a.city = 'Kherson'
        a.contact_email = 'svaha@gmail.com'
        a.term = '2 years'
        a.set_password('agency1')
        a.save()

        filepath = BASE_DIR+'/test_data/images/pasport/test.jpg'
        p = AgencyFiles()
        p.agency = a
        with open(filepath, 'rb') as image:
            p.image.save('%s.jpeg'% a.id, File(image), save=True)
        p.save()

        filepath = BASE_DIR+'/test_data/video/test.mp4'
        p = AgencyFiles()
        p.agency = a
        with open(filepath, 'rb') as image:
            p.video.save('%s.mp4'% a.id, File(image), save=True)
        p.save()

        add_w(1,6,a)


        a = Agency()
        a.name = 'Buty-muti'
        a.username = 'agency2'
        a.director = 'Stepan Varenikov'
        a.login = 'agency2'
        a.adress = 'kutuzova 7'
        a.city = 'Nikolaev'
        a.contact_email = 'stepan@gmail.com'
        a.term = '2 years'
        a.set_password('agency2')
        a.save()

        filepath = BASE_DIR+'/test_data/images/pasport/test.jpg'
        p = AgencyFiles()
        p.agency = a
        with open(filepath, 'rb') as image:
            p.image.save('%s.jpeg'% a.id, File(image), save=True)
        p.save()

        filepath = BASE_DIR+'/test_data/video/test.mp4'
        p = AgencyFiles()
        p.agency = a
        with open(filepath, 'rb') as image:
            p.video.save('%s.mp4'% a.id, File(image), save=True)
        p.save()

        add_w(6,10,a)