#!/usr/bin/env python
import tornado.ioloop
import tornado.web
from tornado import autoreload
import json

import os
import django
os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'
django.setup()
from django.contrib.auth.models import User


from tornado.websocket import WebSocketHandler
#import tornadoredis
import redis
redis_client = redis.Redis(host='localhost', port=6379, db=0)
redis_client.set('test','test')

import socketio
mgr = socketio.AsyncRedisManager('redis://localhost:6379/0')
#sio = socketio.AsyncServer(client_manager=mgr)
sio = socketio.AsyncServer(async_mode='tornado', cors_allowed_origins=['http://localhost:4200'], client_manager=mgr)



@sio.event
def connect(sid, environ):
    print("connect ", sid)
    sio.enter_room(sid, 'chat_users');
    #sio.client_manager.listen('user_chat')

@sio.on('ConnectMe')
async def chat_message(sid, data):
    print("message ", data)
    await sio.emit('get_sid', {'sid': sid})
    print("sid ", sid)
    users = User.objects.all()
    print(users)
    

@sio.event
def disconnect(sid):
    print('disconnect ', sid)
    sio.leave_room(sid, 'chat_users')


class SendMessageHandler(tornado.web.RequestHandler):
    async def get(self):
        data = {'data': 'bla'}
        await sio.emit('ping', data, room='chat_users')
        self.write("Hello, world")
        


def make_app():
    return tornado.web.Application([
        # test page
        (r"/send", SendMessageHandler),
        (r"/websocket/", socketio.get_tornado_handler(sio)),
    ])

if __name__ == "__main__":
    print('Starting server on 8888 port')
    autoreload.start()
    autoreload.watch('tornado_server.py')
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()