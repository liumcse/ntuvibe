import hashlib
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from webapi.utils import send_activate_account_email, generate_activation_token


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


def create_or_update_user_by_email(email, username, password=None, is_active=True):
	user = get_user_by_email(email=email)
	if user:
		user.username = username
		if password:
			user.set_password(password)
		user.is_active = is_active
		user.save()
		return True
	else:
		user = User.objects.create_user(username, email, password)
		user.is_active = is_active
		user.save()
		return user


def update_user_profile(user, **kwargs):
	for key, val in kwargs.items():
		if val is not None:
			setattr(user.profile, key, val)


def register_email(email):
	result = {'success': False}

	user_with_same_email = get_user_by_email(email)
	if user_with_same_email:
		result["error"] = "same email already exists"
		return result

	send_activate_account_email(email=email, token=generate_activation_token(email=email))
	result['success'] = True
	return result


def prepare_profile_dict(user):
	return {
		"data": {
			"id": user.pk,
			"username": user.username,
			"email": user.email,
			"major": user.profile.major,
			"avatar": user.profile.avatar,
		}
	}
