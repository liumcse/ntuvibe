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


def get_user_by_username(username):
	return User.objects.filter(username=username).first()


def get_username_by_email(email):
	user = get_user_by_email(email=email)
	if user:
		return user.username
	return None


def register_user(username, password, email):
	result = {'success': False}

	user_with_same_email = get_user_by_email(email)
	if user_with_same_email and user_with_same_email.is_active:
		raise Exception("same email already activated")

	user_with_same_username = get_user_by_username(username)
	if user_with_same_username and user_with_same_username.email != email:
		raise Exception("same username already activated")

	try:
		if user_with_same_email:  # is_active == False
			user_with_same_email.username = username
			user_with_same_email.set_password(password)
			user_with_same_email.save()
		else:
			user = User.objects.create_user(username, email, password)
			user.is_active = False
			user.save()
	except Exception as e:
		result['error'] = str(e)
		return result

	send_activate_account_email(email=email)
	result['success'] = True
	return result
