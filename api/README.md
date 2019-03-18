This directory contains the API server.

# Part 1: Development
How to set up local dev environment?



# Part 2: Deployment
How to deploy to a remote server?
NTUVibe holds an EC2 instances, which is provided by AWS. 

## MySQL
* Recently, ntuvibe shifted to the official mysql image.
* When setting up the remote server for the first time,
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


## One-time setup of SSL (HTTPS)


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