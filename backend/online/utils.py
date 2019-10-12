from online.models import UserOnline
from rest_framework.authtoken.models import Token
from online.models import UserOnline
import redis
import json
redis_client = redis.Redis(host='localhost', port=6379, db=4)
from account.user_serializer import user_serializer



def set_user_online(data):
    #print(data)
    try:
        user = Token.objects.get(key=data['token']).user
        print(user)
        uo = UserOnline()
        uo.user = user
        uo.agent = data['agent']
        uo.token = data['token']
        try:
            uo.sid = data['socket_id']
        except:
            print('Session ID is not provided!!!')
        uo.save()
        profile = uo.user.userprofile
        profile.set_online()
    except Exception as e:
        print(e)
    data = {
    'task': 'user_online',
    'user': {data['user'].id: user_serializer(data['user'])}
    }
    print('Sending to redis')
    redis_client.publish('notifications',json.dumps(data))

def set_user_offline(data):
    try:
        token = data['token']
    except:
        token = None
    try:
        socket_id = data['socket_id']
    except:
        socket_id = None    
    if token:    
        try:
            user = Token.objects.get(key=token).user
            try:
                uo = UserOnline.objects.get(token=token)
                uo.delete()
            except Exception as e:
                print('Can not find user online by token %s! %s' % (token,e))
            profile = uo.user.userprofile
            profile.set_offline()  
            data = {
            'task': 'user_offline',
            'user': {profile.id: user_serializer(profile)}
            }
            redis_client.publish('notifications',json.dumps(data))
        except Exception as e:
            print('Can not find user by token %s! %s' % (token,e))

    
    if socket_id:
        print('set offline by socket_id')   
        try:
            uo = UserOnline.objects.get(sid=socket_id)
            token = uo.token
            profile = uo.user.userprofile
            uo.delete()
            if UserOnline.objects.filter(token=token).count()==0:
                profile.set_offline()
            data = {
            'task': 'user_offline',
            'user': {profile.id: user_serializer(profile)}
            }
            redis_client.publish('notifications',json.dumps(data))              
        except Exception as e:
            print('Can not find user by socket_id %s. %s' % (socket_id,e) )
            #UserOnline.objects.filter(user_id=data['user_id']).delete()
    
