from webapi.models import (
	CourseTab,
	UserTab,
	CourseRatingTab,
	ProfessorTab,
	ProfessorRatingTab,
	ClassScheduleTab
)
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import hashlib


def get_users(**kwargs):
	return UserTab.objects.filter(**kwargs)


def get_user_by_user_id(user_id):
	return UserTab.objects.filter(id=user_id).first()


def get_user_by_email(email):
	return UserTab.objects.filter(email=email).first()


def register_user(username, password, email):
	result = {'success': False}
	try:
		user = User.objects.create_user(username, email, password)
		user.is_active = False
		user.save()
	except Exception as e:
		result['error'] = str(e)
		return result

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
