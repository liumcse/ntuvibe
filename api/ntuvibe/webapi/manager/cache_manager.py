import hashlib
import random
from django.core.cache import caches

from webapi.utils import get_timestamp
from webapi.constants import StatusCode
from ntuvibe.secret_settings import SECRET_KEY


def generate_token(timestamp=None):
	hash = hashlib.sha256()
	if not timestamp:
		timestamp = get_timestamp()
	hash.update(str(timestamp).encode())
	hash.update(str(random.randint(2**30, 2**31-1)).encode())
	hash.update(SECRET_KEY.encode())

	token = hash.hexdigest()
	return token

def register_token(email, token, token_type):
	cache = caches[token_type]
	cache.set(email, token, timeout=60*60*24)

def generate_and_register_token(email, token_type, timestamp=None):
	token = generate_token(timestamp)
	register_token(email, token, token_type)
	return token

def generate_and_register_activation_token(email, timestamp=None):
	return generate_and_register_token(
		email=email, 
		token_type="activation_token",
		timestamp=timestamp
	)

def generate_and_register_password_reset_token(email, timestamp=None):
	return generate_and_register_token(
		email=email, 
		token_type="password_reset_token",
		timestamp=timestamp
	)

def ensure_valid_email_token(email, token, token_type):
	cache = caches[token_type]
	correct_token = cache.get(email)
	if not (correct_token and token == correct_token):
		raise Exception(StatusCode.INVALID_ACTIVATION_TOKEN)

def ensure_valid_email_activation_token(email, token):
	ensure_valid_email_token(
		email=email,
		token=token,
		token_type="activation_token"
	)

def ensure_valid_email_password_reset_token(email, token):
	ensure_valid_email_token(
		email=email,
		token=token,
		token_type="password_reset_token"
	)

def remove_activation_token_from_cache(email):
	cache = caches["activation_token"]
	cache.delete(email)


def set_course_vacancy(course_code, course_vacancy):
	cache = caches["course_vacancy"]
	cache.set(course_code.upper(), course_vacancy, timeout=60*60*15)


def get_course_vacancy_by_course_code(course_code):
	cache = caches["course_vacancy"]
	return cache.get(course_code.upper())
