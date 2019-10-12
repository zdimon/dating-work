from django.core.management.base import BaseCommand, CommandError
from props.models import Props, Value, Value2User

from .utils import load_props
from django_countries.data import COUNTRIES
from backend.settings import BASE_DIR
import json
from account.models import UserProfile

def seed_users():
    for u in UserProfile.objects.filter(gender='female'):
        print('seeding .... %s' % u)
        for p in Props.objects.filter(for_woman=True):
            v = Value.objects.filter(prop=p).order_by('?').first()
            u2v = Value2User()
            u2v.prop = p
            u2v.value = v
            u2v.user = u
            u2v.save()


def insert_one(d):
    print('Saving....%s' % d['name_en'])
    p = Props()
    p.name_ru = d['name_ru']
    p.name_en = d['name_en']
    p.alias = d['alias']
    p.type = d['type']
    p.for_woman = True
    p.save()
    for i in d['options']:
        v = Value()
        v.prop = p
        v.name_ru = i['name_ru']
        v.name_en = i['name_en']
        v.save()
    
class Command(BaseCommand):
    'Import props into DB'
    help = 'Import props into DB'

    def handle(self, *args, **options):
        print('Importing props...')
        Props.objects.all().delete()
        Value.objects.all().delete()

        path = BASE_DIR+'/test_data/props.json'
        with open(path,'r') as f:
            data = f.read()
            jdata = json.loads(data)
        
        for i in jdata:
            insert_one(i)
        seed_users()

        '''
        load_props()


        prop = Props.objects.create(name="Country", name_ru="Country", alias="сountry", for_woman=True)

        for value in COUNTRIES.values():
            Value.objects.bulk_create([
                Value(prop=prop, name=value, name_ru=value)
            ])
            print('Prop %s created!' % value)
        print('All props are loaded!')
        '''
