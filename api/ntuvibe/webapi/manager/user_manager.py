import re
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.auth.models import User

from .cache_manager import generate_and_register_activation_token, generate_and_register_password_reset_token
from .system_manager import get_all_reserved_words, get_all_censored_words
from webapi.constants import StatusCode, VALID_EMAIL_DOMAIN


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

def user_exists_by_email(email):
	return bool(get_user_by_email(email=email))


def create_or_update_user_by_email(email, username, password=None, is_active=True):
	user = get_user_by_email(email=email)
	if user:
		if username:
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
	user.profile.save()


# ========== logic related ==========

def send_email_from_template(subject, from_email, to, template, **kwargs):
	message = render_to_string(template, kwargs)
	send_mail(subject, message, from_email, to, html_message=message)

def _send_activate_account_email(email, token):
	subject = "Welcome to NTUVibe - Account Activation"
	to = [email]
	from_email = 'ntuvibe@gmail.com'

	formatted_email = email.replace("@", "&").replace(".", "!")
	send_email_from_template(
		subject=subject,
		from_email=from_email,
		to=to,
		template='users/activate_account.html',
		email=formatted_email,
		token=token)

def _send_reset_password_email(email, token):
	subject = "NTUVibe - Password Reset"
	to = [email]
	from_email = 'ntuvibe@gmail.com'

	formatted_email = email.replace("@", "&").replace(".", "!")
	send_email_from_template(
		subject=subject,
		from_email=from_email,
		to=to,
		template='users/reset_password.html',
		email=formatted_email,
		token=token)


def register_email(email):
	_send_activate_account_email(email=email, token=generate_and_register_activation_token(email=email))

def reset_password_email(email):
	_send_reset_password_email(email=email, token=generate_and_register_password_reset_token(email=email))

def prepare_profile_data(user):
	return {
		"id": user.pk,
		"username": user.username,
		"email": user.email,
		"major": user.profile.major,
		"avatar": user.profile.avatar,
	}


def prepare_schedule_data(user):
	return user.profile.schedule


def check_username_contains_reserved_or_censored_words(username):
	reserved_words = get_all_reserved_words()
	censored_words = get_all_censored_words()

	for word in reserved_words:
		if word.value.lower() in username.lower():
			return True
	for word in censored_words:
		if word.value.lower() in username.lower():
			return True
	return False


# ========== ensure & exception ==========

def ensure_valid_email_format(email):
	email_pattern = re.compile(".+@.+")
	if not email_pattern.match(email):
		raise Exception(StatusCode.INVALID_NTU_EMAIL)
	if email.split("@")[-1] not in VALID_EMAIL_DOMAIN:
		raise Exception(StatusCode.INVALID_NTU_EMAIL)


def ensure_unique_email(email):
	if user_exists_by_email(email):
		raise Exception(StatusCode.DUPLICATE_EMAIL)

def ensure_existing_email(email):
	if not user_exists_by_email(email):
		raise Exception(StatusCode.DUPLICATE_EMAIL)


def ensure_unique_appropriate_username(username, user_id=None):  # user_id == None when a new user is trying to activate
	user_with_same_username = get_user_by_username(username)
	if user_with_same_username:
		if not user_id:
			raise Exception(StatusCode.DUPLICATE_USERNAME)
		if user_id and user_with_same_username.id != user_id:
			raise Exception(StatusCode.DUPLICATE_USERNAME)
	if check_username_contains_reserved_or_censored_words(username):
		raise Exception(StatusCode.BAD_USERNAME)
