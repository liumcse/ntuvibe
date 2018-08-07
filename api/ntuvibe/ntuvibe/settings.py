"""
Django settings for ntuvibe project.

Generated by 'django-admin startproject' using Django 2.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os
from . import secret_settings

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

SECRET_KEY = secret_settings.SECRET_KEY

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'webapi',
	'corsheaders',
]

MIDDLEWARE = [
	'corsheaders.middleware.CorsMiddleware',
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	# 'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ntuvibe.urls'

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [
			os.path.join(BASE_DIR, 'templates'),
		],
		'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
			],
		},
	},
]

WSGI_APPLICATION = 'ntuvibe.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.mysql',
		'NAME': 'ntubits_db',
		'USER': secret_settings.DATABASE_USER_DEFAULT,
		'PASSWORD': secret_settings.DATABASE_PASSWORD_DEFAULT,
		'HOST': 'localhost',
		'PORT': '3306',
	}
}


CACHES = {
	"default": {
		"BACKEND": "django_redis.cache.RedisCache",
		"LOCATION": "redis://127.0.0.1:6379/0",
		"OPTIONS": {
			"CLIENT_CLASS": "django_redis.client.DefaultClient",
		}
	},
	"activation_token": {
		"BACKEND": "django_redis.cache.RedisCache",
		"LOCATION": "redis://127.0.0.1:6379/1",
		"OPTIONS": {
			"CLIENT_CLASS": "django_redis.client.DefaultClient",
		},
		"KEY_PREFIX": "activation_token"
	}
}


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
	},
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en'
TIME_ZONE = 'Asia/Singapore'
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_ROOT = BASE_DIR
STATIC_URL = '/static/'
STATICFILES_DIRS = (
	os.path.realpath(os.path.dirname(__file__)) + '/../static',
)

CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = ("localhost:8080", "127.0.0.1:8000", "127.0.0.1:8080", "ntuvibe.com", "api.ntuvibe.com")


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = secret_settings.EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = secret_settings.EMAIL_HOST_PASSWORD
EMAIL_PORT = 587

SESSION_COOKIE_SECURE = False
SESSION_COOKIE_AGE = 7 * 24 * 60 * 60
SESSION_COOKIE_NAME = "sessionid"
SESSION_ENGINE = "django.contrib.sessions.backends.cache"

log_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "log"))
if log_dir and not os.path.exists(log_dir):
	os.mkdir(log_dir)
LOGGING = {
	'version': 1,
	'disable_existing_loggers': True,
	'formatters': {
		'standard': {
			'format': '%(asctime)s.%(msecs)03d|%(levelname)s|%(process)d:%(thread)d|%(filename)s:%(lineno)d|%(module)s.%(funcName)s|%(message)s',
			'datefmt': '%Y-%m-%d %H:%M:%S',
		},
		'short': {
			'format': '%(asctime)s.%(msecs)03d|%(levelname)s|%(message)s',
			'datefmt': '%Y-%m-%d %H:%M:%S',
		},
		'data': {
			'format': '%(asctime)s.%(msecs)03d|%(message)s',
			'datefmt': '%Y-%m-%d %H:%M:%S',
		},
	},
	'handlers': {
		'file_fatal': {
			'level': 'CRITICAL',
			'class': 'logging.handlers.TimedRotatingFileHandler',
			'filename': os.path.join(log_dir, 'fatal.log').replace('\\', '/'),
			'when': 'MIDNIGHT',
			'formatter': 'standard',
		},
		'file_error': {
			'level': 'ERROR',
			'class': 'logging.handlers.TimedRotatingFileHandler',
			'filename': os.path.join(log_dir, 'error.log').replace('\\', '/'),
			'when': 'MIDNIGHT',
			'formatter': 'standard',
		},
		'file_info': {
			'level': 'DEBUG',
			'class': 'logging.handlers.TimedRotatingFileHandler',
			'filename': os.path.join(log_dir, 'info.log').replace('\\', '/'),
			'when': 'MIDNIGHT',
			'formatter': 'short',
		},
		'file_data': {
			'level': 'DEBUG',
			'class': 'logging.handlers.TimedRotatingFileHandler',
			'filename': os.path.join(log_dir, 'data.log').replace('\\', '/'),
			'when': 'MIDNIGHT',
			'formatter': 'data',
		},
	},
	'loggers': {
		'main': {
			'handlers': ['file_fatal', 'file_error', 'file_info'],
			'level': 'DEBUG',
			'propagate': True,
		},
		'data': {
			'handlers': ['file_data'],
			'level': 'DEBUG',
			'propagate': True,
		},
	}
}
