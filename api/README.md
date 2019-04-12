This directory contains the API server.

# Part 1: Development
How to set up local dev environment?
1. Have `$ROOT/api/ntuvibe/secret_settings.py` in place
2. We recommend developers to use PyCharm
    1. When setting up with PyCharm, create an virtual environment with python `3.x` as base interpreter
    2. Enter the virtual env, and then install dependencies with
    ```bash
    cd $ROOT/api
    pip3 install -r requirements.txt
    ```
3. Install Redis
4. Set up DataBase
    1. Install MySQL
    2. Create a new database: in MySQL, `create database ntuvibe_db;`
    3. Create a db user according to `secret_settings.py`, remember to grant access to `ntuvibe_db`
    4. Migration:
    ```bash
    python3 manage.py makemigrations
    python3 manage.py migrate
    python3 manage.py createsuperuser
    ```
5. To start local server
```bash
python3 manage.py runserver
```

# Part 2: Deployment (with Docker & docker-machine)
How to deploy to a remote server?
NTUVibe holds an EC2 instance, which is provided by AWS.
1. For deployment, please approach NTUVibe Admins for SSH access.
2. Make sure you install Docker on both the server side and you local machine.
3. Make sure port `2376` is open on server side.
4. Register the remove server under your `docker-machine`: (You only need to do this once on your local machine.)
```bash
docker-machine create --driver generic --generic-ip-address api.ntuvibe.com --generic-ssh-user ubuntu --generic-ssh-key ~/.ssh/id_rsa ntuvibe
```
5. Switch to the newly registered NTUVibe server:
```bash
eval "$(docker-machine env ntuvibe)"
```
6. Shutdown previously running containers:
```bash
cd $ROOT
docker-compose down
```
7. Build and start new containers:
```bash
cd $ROOT
docker-compose up --build
```
8. Leave NTUVibe server
```bash
eval "$(docker-machine env -u)"
```

# Part 3: Design Consideration
## MySQL
* For efficiency, we recommend you to install real MySQL in your dev environment.
* However, NTUVibe runs a MySQL container for the production environment.
* When deploying to remote production server for the first time,
replace the `db` service in `docker-compose.yml` with following:
```
  db:
    image: mysql:5.7
    ...
    environment:
      - MYSQL_HOST=localhost
      - MYSQL_PORT=3306
      - MYSQL_DATABASE=ntuvibe_db
      - MYSQL_USER=<ntuvibe_username>
      - MYSQL_PASSWORD=<ntuvibe_password>
      - MYSQL_ROOT_PASSWORD=<root_password>
```
* (Remember not to commit db passwords to github repo)<br>
* Simply delete the environment variables above for subsequent deployments.

## Redis
* For efficiency, we recommend you to install real Redis in your dev environment.
* However, NTUVibe runs a Redis container for the production environment.

## Web (NTUVibe)
### uwsgi
### log
### crontab
* list current crontabs: (remember to user `sudo`)
```
sudo crontab -l
```
* edit crontabs using this command: (remember to user `sudo`)
```
sudo crontab -e
```
and then paste the following content into the vim/nano editor
```
# auto-renewal of ssl certificate
30 2 * * 1 sudo /usr/local/sbin/le-renew-webroot >> /var/log/le-renewal.log
#Ansible: crawl course content
21 0 3,19 * * sudo docker exec -it api_web_1 sh -c "python3 /api/scrapers/cronjobs/course_content_to_db.py >> /log_scrapers/course_content.log 2>&1"
#Ansible: crawl class schedule
59 0 * * 6 sudo docker exec -it api_web_1 sh -c "python3 /api/scrapers/cronjobs/class_schedule_to_db.py >> /log_scrapers/class_schedule.log 2>&1"
#Ansible: crawl exam schedule
35 1 * * 6 sudo sudo docker exec -it api_web_1 sh -c "python3 /api/scrapers/cronjobs/exam_schedule_to_db.py >> /log_scrapers/exam_schedule.log 2>&1"
```
save the file, quit
* Do `sudo crontab -l` again to verify that the cronjobs are correctly updated


## NginX
Content of `/etc/nginx/sites-available/api.ntuvibe.com`, it make NginX proxy requests to its upstream, which is a file sock.
```
upstream django_ntuvibe {
    server unix:/data/docker/uwsgi/ntuvibe_uwsgi.sock; # for a file socket
    # server api.ntuvibe.com:8001; # for a web port socket
}

server {
    listen 80;
    server_name api.ntuvibe.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name api.ntuvibe.com;
    
    ssl_certificate /etc/letsencrypt/live/api.ntuvibe.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.ntuvibe.com/privkey.pem;
    
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';
    
    access_log  /var/log/nginx/ntuvibe_nginx.access.log;
    error_log   /var/log/nginx/ntuvibe_nginx.error.log;
    # error_page   500 502 503 504  /50x.html;
        
    client_body_buffer_size 256k;
    client_max_body_size 50M;
    
    root /usr/share/nginx/html;
    # location = /50x.html {
    #         root   /usr/share/nginx/html;
    # }

    # location ~* \.(eot|gif|svg|ttf|woff|jpg|jpeg|gif|png|ico|css|zip|tgz|gz|rar|bz2|doc|xls|exe|pdf|ppt|txt|tar|mid|midi|wav|bmp|rtf|js|mov|json|map|svg|htm|html)$ {
    #         access_log   off;
    #         root /data/release/ntuvibe/api/ntuvibe/;
    # }
    
    location / {
        uwsgi_pass  django_ntuvibe;
        include     /etc/nginx/uwsgi_params; # the uwsgi_params file you installed
    }

    location ~ /.well-known {
        allow all;
    }
}
```
Symlink to this file from /etc/nginx/sites-enabled so nginx can see it:
sudo ln -s /etc/nginx/sites-available/api.ntuvibe.com /etc/nginx/sites-enabled/

## Setup and Auto-Renewal of SSL (HTTPS)
Please follow the steps in this [Youtube Tutorial](https://www.youtube.com/watch?v=m9aa7xqX67c)


## About Previous Design (no Docker)
* Deploy with Ansible
* Directory Struture on Remote Server
```
ubuntu@ntuvibe:/data/release$ tree -L 3 .
.
|-- backup
|   `-- ntuvibe
|       |-- ........
|       |-- 20180914_210746
|       |-- 20180914_211210
|       |-- 20180914_211852
|       |-- 20181115_014808
|       |-- 20181115_015935
|       |-- 20181215_153815
|       |-- 20190114_161459
|       |-- 20190115_115232
|       `-- 20190312_225830
|-- log
|   `-- ntuvibe
|       |-- info.log.YYYY.MM.DD
|       |-- data.log.YYYY.MM.DD
|       |-- error.log.YYYY.MM.DD
|       `-- cronjobs
|           |-- class_schedule.log
|           |-- course_content.log
|           `-- exam_schedule.log
|-- ntuvibe -> /data/release//backup//ntuvibe/20190312_225830
`-- uwsgi (containing .pid, .sock, .log, .ini)
```