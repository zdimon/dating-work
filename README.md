# Dating Club.

## Requirements 

Django 2.2.4

Redis

Celery

Tornado

PostgreSQL

Angular 7

## Server software

    apt install npm git virtualenv python3-dev redis-server
    npm install @angular/cli -g
    
Updating nodeJS.

    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable

## Deploy
    
    git clone git@github.com:zdimon/dating-club.git
    cd dating-club/frontend
    npm install
    cd ..
    virtualenv -p python3 venv
    . ./venv/bin/activate
    pip install -r requirements.txt
    ./manage.py migrate
    
## Dev Django server
    
    ./bin/start_django
    
url: http://localhost:8000
    
## Dev Angular server
    
    ./bin/start_ng
    
url: http://localhost:4200
    
## Socket-server
    
    ./bin/start_socket
    
url: http://localhost:8888
    
## Documentation server

    ./bin/start_doc
    
url: http://localhost:8085    
    
    
## Nginx settings for production.


    server {


            server_name dating-test.webmonstr.com;

            location / {
                    proxy_pass http://localhost:4200;
            }

    }

    server {


            server_name ng-dating-test.webmonstr.com;

            location / {
                    proxy_pass http://localhost:8000;
            }

    }


    
[Modules](docs/modules.md)

[Plan](docs/graph.pdf)


## Settings

[Sending email](docs/email.md)