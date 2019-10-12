import redis
redis_client = redis.Redis(host='localhost', port=6379, db=4)
from online.models import UserOnline
from django.utils.translation import ugettext_lazy as _
import json

from room.models import ChatContact
def mark_room_as_current(room,owner):
    c = ChatContact.objects.get(owner=owner,room=room)
    c.set_current() 

def check_man_account(room):
    payer = room.get_payer()
    if payer.account<4:
        return False
    else:
        return True

def send_notification_to_woman(room):
    pass
    '''
    woman = room.get_woman()
    sids = UserOnline.get_sids_by_user(woman)
    message = _('Sorry you can not send message')
    data = {
        'task': 'send_chat_message_to_sids',
        'sids': sids,
        'message': '%s' % message,
        'user': {'username': 'moderator', 'main_photo': 'test'},
        'room_id': room.id,
        'time': '123'
    }
    print(data)
    redis_client.publish('notifications',json.dumps(data))
    '''
