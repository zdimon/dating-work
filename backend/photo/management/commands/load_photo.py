from django.core.management.base import BaseCommand, CommandError
from account.models import UserProfile
from django.contrib.auth.models import User
from backend.settings import DOMAIN, BASE_DIR
import requests
import sys
import json
from django.core.files import File
from photo.models import UserPhoto
import random

def load_photo(user):
    print('Loading...%s' % user)
    p = UserPhoto()
    p.user = user.userprofile
    p.is_approved = True
    filepath = BASE_DIR+'/test_data/images/%s.jpeg' % random.randint(1,10)
    with open(filepath, 'rb') as image:
        p.image.save('%s.jpeg'% user.id, File(image), save=True)
    p.save()

class Command(BaseCommand):
    'Import photo into DB'
    help = 'Import photo into DB'
    def handle(self, *args, **options):
        print('Importing photo...')
        
        for user in User.objects.all():
            load_photo(user)
            '''
            print('Loading...%s' % user)
            print('Obtaining token')
            url = '%s/api-token-auth/' % DOMAIN
            data = {'username': user.username, 'password': user.username}
            res = json.loads(requests.post(url,data=data).text)
            print(res['token'])

            # 
            url = '%s/photos/' % DOMAIN
            data = {
                'user': user.id
            }
            files = {"image": ('image.jpeg', open(BASE_DIR+'/test_data/images/1.jpeg', 'rb'), 'jpeg')}
            headers={
                "Authorization":"Token %s" % res['token'],
                #"Content-Type": 'multipart/form-data'
                'Content-Type': 'application/json multipart/form-data',
            }
            files = {
                'json': (None, json.dumps(data), 'application/json'),
                'image': ('image.jpeg', open(BASE_DIR+'/test_data/images/1.jpeg', 'rb'), 'application/octet-stream')
            }
            print(data)
            resp = requests.post(url, files=files)
            print(resp.text)
            sys.exit('Ok')
            '''