# The first instruction is what image we want to base our container on
# We Use an official Python runtime as a parent image
FROM python:3.6

ENV PYTHONUNBUFFERED 1
ENV DOCKER_CONTAINER_FLAG 1

# create root directory for our project in the container
RUN mkdir /code
RUN mkdir /uwsgi

# Copy the current directory contents into the container at /code
ADD . /code

# Set the working directory to /code
WORKDIR /code

# Install any needed packages specified in requirements.txt
RUN pip3 install -r requirements.txt

# collect static files needed for django admin site: with path /code/static/admin/
RUN python3 manage.py collectstatic

# Install uwsgi
RUN pip3 install uwsgi

EXPOSE 8000

#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["uwsgi", "--ini", "ntuvibe_uwsgi.ini"]
#CMD ["uwsgi", "--http", ":8000", \
#              "--chdir", "/code/ntuvibe", \
#              "--module", "ntuvibe.wsgi", \
#              "--master", "true", \
#              "--processes", "2", \
#              "--threads", "2", \
#              "--vacuum", "true", \
#              "--safe-pidfile", "/uwsgi/ntuvibe_uwsgi.pid", \
#              "--daemonize", "/uwsgi/ntuvibe_uwsgi.log", \
#              "--check-static", "."]
