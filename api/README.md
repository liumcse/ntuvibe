This directory contains the API server.


# MySQL
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
