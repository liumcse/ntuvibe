import hashlib
import random
from django.core.cache import caches

from webapi.utils import get_timestamp
from webapi.constants import StatusCode
from ntuvibe.secret_settings import SECRET_KEY


def generate_activation_token(email, timestamp=None):
	hash = hashlib.sha256()
	if not timestamp:
		timestamp = get_timestamp()
	hash.update(str(timestamp).encode())
	hash.update(str(random.randint(2**30, 2**31-1)).encode())
	hash.update(SECRET_KEY.encode())

	token = hash.hexdigest()
	cache = caches["activation_token"]
	cache.set(email, token, timeout=60*60*24)
	return token


def ensure_valid_email_activation_token(email, token):
	cache = caches["activation_token"]
	correct_token = cache.get(email)
	if not (correct_token and token == correct_token):
		raise Exception(StatusCode.INVALID_ACTIVATION_TOKEN)


def remove_activation_token_from_cache(email):
	cache = caches["activation_token"]
	cache.delete(email)


def set_course_vacancy(course_code, course_vacancy):
	cache = caches["course_vacancy"]
	cache.set(course_code.upper(), course_vacancy, timeout=60*60*15)


def get_course_vacancy_by_course_code(course_code):
	cache = caches["course_vacancy"]
	return cache.get(course_code.upper())
