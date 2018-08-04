ubuntu:

put public keys (locally `cat ~/.ssh/id_rsa.pub`) under ~/.ssh/authorized_keys

apt install python3-pip

apt-get install mysql-server
apt-get install libmysqlclient-dev
pip3 install mysqlclient==1.3.13

apt-get install python
(ansible must have a python2 on server side)
pip3 install ansible

df -h
(check storage)
du -sh .

pip3 install uwsgi
pkill -f uwsgi -9
(shut down uwsgi)

apt-get install nginx
ln -s /etc/nginx/sites-available/api.ntuvibe.com /etc/nginx/sites-enabled/
nginx -t
service nginx reload


(SSL and https: tutorial from https://www.youtube.com/watch?v=m9aa7xqX67c)
service nginx stop
apt-get install git
git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt
cd /opt/letsencrypt/
./letsencrypt-auto certonly --standalone
ls /etc/letsencrypt/live/api.ntuvibe.com
(check .pem files)
(then change nginx config `api.ntuvibe.com` accordingly)
service nginx start

(auto-renewal of SSL certificate)
cp /opt/letsencrypt/examples/cli.ini /usr/local/etc/le-renew-webroot.ini
vim le-renew-webroot.ini (do modification according to the tutorial)
cd /opt/letsencrypt/
./letsencrypt-auto certonly -a webroot --renew-by-default --config /usr/local/etc/le-renew-webroot.ini
curl -L -o /usr/local/sbin/le-renew-webroot http://do.co/le-nginx-renew
chmod +x /usr/local/sbin/le-renew-webroot
crontab -e (add `30 2 * * 1 /usr/local/sbin/le-renew-webroot >> /var/log/le-renewal.log`)
le-renew-webroot (for manual renewal)
