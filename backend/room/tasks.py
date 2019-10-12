from celery import shared_task 
from celery.decorators import task
import json
import redis
redis_client = redis.Redis(host='localhost', port=6379, db=4)
from .models import ChatRoom, ChatContact
from account.models import UserProfile
from online.models import UserOnline
from room.rooms_serializer import serialize_messages_by_room, detail_room

@task
def sent_chat_message(room):
    print('Sending chat message')
    #print(data)

    ######send to man

    man = room.get_payer()
    sids = UserOnline.get_sids_by_user(man)
    data = {
        'task': 'send_chat_message_to_sids',
        'sids': sids,
        'data': detail_room(room,man)
    }
    redis_client.publish('notifications',json.dumps(data))

    ######send to woman

    woman = room.get_woman()
    sids = UserOnline.get_sids_by_user(woman)
    data = {
        'task': 'send_chat_message_to_sids',
        'sids': sids,
        'data': detail_room(room,woman)
    }
    redis_client.publish('notifications',json.dumps(data))

    '''
    abonent = UserProfile.objects.get(pk=data['abonent_id'])
    sids = UserOnline.get_sids_by_user(abonent)
    data['abonent_id'] = user.id
    data = {
        'task': 'send_chat_message_to_sids',
        'sids': sids,
        'data': data
    }
    redis_client.publish('notifications',json.dumps(data))
    '''
    