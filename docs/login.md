## Логин

1. Вызываем из компонента метод сервиса

      login(){
        this._facadeService.loginService.login({'username': this.user.username, 'password': this.user.password});
      }

2. В сервисе

  public login(user) {
    localStorage.removeItem('access_token');
    user.socket_id = localStorage.getItem('socket_id');
    this.http.post(`${this.app_config.APIurl}/api-token-auth/`,user).subscribe(
      (data: any) => {
        localStorage.setItem('access_token', data['token']);
        this.session_store.dispatch(new sessionActions.LogIn(data));
      }
   ...

- очищаем токен с локального хранилища браузера

- добавляем ид сокет текущего соединения для передачи на сервер

- делаем запрос на сервер и получаем токен

- ложим токен в локальное хранилище браузера

- диспачим в стору данные сервера


3. В редьюсере сторы устанавливаем токен, признак авторизованности и данные по пользователю

      case Actions.ActionTypes.LogIn:

          return {
            ...state,
            token: action.payload.token,
            is_auth: true,
            user: action.payload.user
          };

4. Отложенная задача в celery

    def set_user_online(data):
        print(data)
        try:
            user = Token.objects.get(key=data['token']).user
            print(user)
            uo = UserOnline()
            uo.user = user
            uo.token = data['token']
            try:
                uo.sid = data['socket_id']
            except:
                print('Session ID is not provided!!!')
            uo.save()
            profile = uo.user.userprofile
            profile.is_online = True
            profile.save()
        except Exception as e:
            print(e)
        data = {
        'task': 'user_online'
        }
        print('Sending to redis')
        redis_client.publish('notifications',json.dumps(data))

- делаем изменения в базе

- эмитируем событие в сокет-сервер на апдейт пользователей 


5. Сокет сервер. Событие MESSAGE:set_me_online.


    if  data['action'] == 'MESSAGE:set_me_online' 
        or 
        data['action'] == 'MESSAGE:set_me_offline':

            await sio.emit('server-action:update_user_online')

- просто рассылаем всем уведомление о необходимости обновить пользователей в онлайне

# Разлогин

## Нажатие на педаль "Выход".

      logout(){
        this._facadeService.loginService.logout();
      }

- вызов метода сервиса в компоненте

В сервисе.

  public logout() {
    
    this.http.get(`${this.app_config.APIurl}/logout/`).subscribe(data => {
      localStorage.removeItem('access_token');
      this.session_store.dispatch(new sessionActions.LogOut());
    });
  }

- делаем запрос на сервер где выставляем флаг и пр.

- удаляем токен с хранилища браузера

- диспачим акшин в стору

В редьюсере сторы.

      case Actions.ActionTypes.LogOut:

        return {
          ...state,
          token: '',
          is_auth: false,
          user: {}
        };

- очищаем все по сессии пользователя  


## Закрытие вкладки браузера.

В сокет сервере отлавливаем событие.


    @sio.event
    async def disconnect(sid):
        session = await sio.get_session(sid)
        data = {'task': 'set_offline', 'token': session['token'], 'socket_id': sid}
        clear_from_online.delay(data)

- вызываем задачу celery, куда передаем токен и id сокета

Задача селери.

    def set_user_offline(token):
        
        try:
            user = Token.objects.get(key=token).user
            profile = user.userprofile
            profile.is_online = False
            profile.save()
            data = {
            'task': 'user_offline'
            }
            redis_client.publish('notifications',json.dumps(data))
        except Exception as e:
            print('Can not find user by token %s! %s' % (token,e))

        try:
            uo = UserOnline.objects.get(token=token)
            uo.delete()
        except Exception as e:
            print('Can not find user online by token %s! %s' % (token,e))
        data = {
        'task': 'user_offline'
        }
        redis_client.publish('notifications',json.dumps(data))

- изменяем БД

- эмитируем событие в сокет-сервер на апдейт пользователей






