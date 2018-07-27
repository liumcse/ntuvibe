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


def get_user_by_userid(userid):
	return UserTab.objects.filter(id=userid).first()


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


def login_verification(password, userid=None, email=None):
	if userid:
		user = get_user_by_userid(userid)
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