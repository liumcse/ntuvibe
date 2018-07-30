from webapi.models import (
	CourseTab,
	UserTab,
	CourseRatingTab,
	ProfessorTab,
	ProfessorRatingTab,
	ClassScheduleTab
)
import hashlib


def get_users(**kwargs):
	return UserTab.objects.filter(**kwargs)


def get_user_by_user_id(user_id):
	return UserTab.objects.filter(id=user_id).first()


def get_user_by_email(email):
	return UserTab.objects.filter(email=email).first()


def register_user(username, password, email):
	salt = uuid4()
	sha = hashlib.sha512()
	sha.update(password)
	sha.update(salt)
	user = UserTab(
		username=username,
		salt=salt,
		hashed_password=sha.hexdigest(),
		email=email,
	)
	user.create()


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
