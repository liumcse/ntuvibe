# The first instruction is what image we want to base our container on
# We Use an official Python runtime as a parent image
FROM python:3.6

ENV PYTHONUNBUFFERED 1
ENV DOCKER_CONTAINER_FLAG 1

# create root directory for our project in the container
RUN mkdir /api
RUN mkdir /uwsgi
RUN mkdir /log_scrapers

# Copy the current directory contents into the container at /api
ADD . /api

# Set the working directory to /api
WORKDIR /api

# Install any needed packages specified in requirements.txt
RUN pip3 install -r requirements.txt

# collect static files needed for django admin site: with path /api/static/admin/
RUN python3 manage.py collectstatic

# Install uwsgi
RUN pip3 install uwsgi

EXPOSE 8000

CMD ["uwsgi", "--ini", "ntuvibe_uwsgi.ini"]
