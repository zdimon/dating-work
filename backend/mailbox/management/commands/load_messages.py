from django.core.management.base import BaseCommand, CommandError

from backend.settings import DOMAIN, BASE_DIR
from django.core.files import File
from mailbox.models import Messages
from account.models import UserProfile
import random

class Command(BaseCommand):
    'Import messages'
    def handle(self, *args, **options):
        for u in UserProfile.objects.all():
            to = UserProfile.objects.order_by("?").first()
            m = Messages()
            m.from_user = u
            m.to_user = to
            m.content = 'Mesdsage from %s' % u
            m.save()
            print('Saving %s ' % m.id)