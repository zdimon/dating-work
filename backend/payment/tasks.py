from celery.decorators import task
from room.models import ChatRoom, ChatContact
from payment.models import PaymentType, Payment
import redis
redis_client = redis.Redis(host='localhost', port=6379, db=4)
from account.user_serializer import user_serializer
import json
import time
from room.rooms_serializer import detail_room
from payment.models import Payment


def update_account_service(profile):
    print('Updating account')
    for cc in ChatContact.objects.filter(owner=profile):
        room = cc.room
        room.is_low_account = False
        room.save()
        send_update_room(room)

def make_transaction(user,room):
    tp = PaymentType.objects.get(alias='text-chat')
    user.account = user.account - tp.price
    user.save()
    Payment.get_chat_text_payment_or_create(room)
    # disactive room and note a man
    if user.account<=0:
        room.close_room_by_low_account()
        send_update_room(room)

def send_update_room(room):

    for contact in ChatContact.objects.filter(room=room):
        for online in contact.owner.get_socket_ids():
            print('sending to %s' % online.sid )
            data = {
                'task': 'put_to_socket',
                'data': {
                    'action': 'server-action:update_current_room',
                    'socket_id': online.sid,
                    'data': detail_room(room,contact.owner)
                }            
            }
            redis_client.publish('notifications',json.dumps(data)) 


def send_show_billing(sid):
    data =  {
        'task': 'put_to_socket',
        'data': {
            'action': 'server-action:show_billing_dialog',
            'socket_id': sid,
        }
    }            
    #print('Sending to REDIS')
    #print(data)
    redis_client.publish('notifications',json.dumps(data))    

@task
def charge_for_chat():
    print('Charging for chat')
    #redis_client.publish('notifications',json.dumps(data))
    for room in ChatRoom.objects.filter(is_active=True):
        now = time.time()-120
        if room.activity < now:
            room.is_active = False
            room.save()
        print('Room %s' % room)
        user = room.get_payer()
        if room.is_active:
            make_transaction(user,room)
        for online in user.get_socket_ids():
            data =  {
                'task': 'put_to_socket',
                'data': {
                    'action': 'server-action:update_session',
                    'socket_id': online.sid,
                    'user': user_serializer(user)
                }
            }            
            redis_client.publish('notifications',json.dumps(data))
            if(user.account==0):
                send_show_billing(online.sid)
        send_update_room(room)