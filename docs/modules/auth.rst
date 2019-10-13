Authorization
=============


Angular
=======

Authorization form auth/login/login.component.ts


.. code:: javascript

  login(){
    this.login_service.login({'username': this.user.username, 'password': this.user.password});
  }


Service login_service.

Get token, language from the server by POST request and save it into the local storage.

Dispatch action LogIn into storage and navigate to /dashboard url.

.. code:: javascript

	  public login(user) {
	    this.token_service.removeToken();
	    user.socket_id = this.token_service.getSid();
	    this.http.post(`${this.app_config.APIurl}/api-token-auth/`,user).subscribe(
	      (data: any) => {
		this.token_service.setToken(data['token'])
		this.token_service.setLanguage(data['language'])
		this.session_store.dispatch(new sessionActions.LogIn(data));
		this.router.navigate(['/dashboard'])
	      },
	      err => {
		this._login_emmiter.next({status: 1, message: 'Invalid login or password'});
		this.errors = err['error'];
	      }
	    );
	  }



.. uml::

   Angular -> Django: POST (login, password)
   Angular <- Django: token, language
   Angular -> Store: token, language

Refreshing or first loading page
================================

Initialization service.

.. code:: javascript

	  public init() {
	    this.http.get(`${this.app_config.APIurl}/init`).subscribe(
	      (data: any) => {
		/// set session user
		this.session_store.dispatch(new sessionActions.Init(data));
		// set online users
		this.user_state.dispatch(new UpdateUsers(data.users_online));
	      },
	      err => {
		this.token_service.removeToken();
	      }
	    );
	  }

Django view.
============

.. automodule:: account.views.InitApp
   
   

