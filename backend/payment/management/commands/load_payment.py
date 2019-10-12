from django.core.management.base import BaseCommand, CommandError

from payment.models import PaymentType, Payment

class Command(BaseCommand):
    'Load Payment types'

    def handle(self, *args, **options):
        print('Load Payment types...')
        PaymentType.objects.all().delete()
        Payment.objects.all().delete()
        p = PaymentType()
        p.alias = 'text-chat'
        p.price = 2
        p.name = 'Charging for the text chat'
        p.save()
        p = PaymentType()
        p.alias = 'message'
        p.price = 3
        p.name = 'Charging for the message'
        p.save()