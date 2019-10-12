from .models import ChatRoom, ChatMessage, ChatContact
from account.serializers import UserSerializer
from rest_framework.response import Response
from account.user_serializer import user_serializer

def serialize_message(m):
    mes = {
            'id': m.id,
            'message': m.message,
            'author_id': m.user.id,
            'created': str(m.created_at)
        }
    return mes

def serialize_messages_by_room(room):
    out = {}
    for m in ChatMessage.objects.filter(room=room).order_by('-id'):
        out[m.id] = serialize_message(m)
    return out

def detail_room(room,user):
    res = {}
    
    abonent = ChatContact.objects.filter(room=room).exclude(abonent=user)[0]
    
    res['abonent_id'] = abonent.abonent.id
    res['id'] = room.id
    res['is_current'] = abonent.is_current
    res['is_active'] = room.is_active
    res['is_low_account'] = room.is_low_account
    res['activity'] = room.activity
    mes = {}
    for m in ChatMessage.objects.filter(room=room):
        mes[m.id] = serialize_message(m)
    res['messages'] = mes
    return res


def get_current_room(user):
    for c in ChatContact.objects.filter(owner=user):
        if c.is_current:
            return c.room.id


def serialize_rooms(user):
    rooms_ids = []
    contacts_ids = []
    contact_users = {}
    rooms_list = {}       
    current_room = {}
    contacts = ChatContact.objects.filter(owner=user)
    for c in contacts:
        rooms_ids.append(c.room.id)
        contact_users[c.abonent.id] = user_serializer(c.abonent)
        contact_users[c.owner.id] = user_serializer(c.owner) 
    for c in contacts:
        contacts_ids.append(c.abonent.id)
    contacts_ids.append(user.id)

    for c in contacts:
        rooms_list[c.room.id] = detail_room(c.room,user)   
    return {
        'room_ids': rooms_ids, 
        'rooms': rooms_list, 
        'contacts_ids': contacts_ids,
        'contact_users': contact_users,
        'current_room': get_current_room(user)
    }