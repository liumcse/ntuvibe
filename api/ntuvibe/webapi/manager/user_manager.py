from django.contrib.auth.models import User
from webapi.utils import send_activate_account_email
from django.contrib.auth import authenticate
import hashlib


def get_users(**kwargs):
	return User.objects.filter(**kwargs)


def get_user_by_user_id(user_id):
	return User.objects.filter(id=user_id).first()


def get_user_by_email(email):
	return User.objects.filter(email=email).first()

def get_django_user_by_username(username):
	return User.objects.filter(username=username).first()


def register_user(username, password, email):
	result = {'success': False}
	try:
		user = User.objects.create_user(username, email, password)
		user.is_active = False
		user.save()
	except Exception as e:
		result['error'] = str(e)
		return result

	send_activate_account_email(user)

	result['success'] = True
	return result


def login_verification(password, user_id=None, email=None):
	if user_id:
		user = get_user_by_user_id(user_id)
	elif email:
		user = get_user_by_email(email)
	else:
		return False

	sha = hashlib.sha512()
	sha.update(password)
	sha.update(user.salt)

	if sha.hexdigest() == user.hashed_password:
		return True

	return False
