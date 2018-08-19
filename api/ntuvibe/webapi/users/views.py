from django.contrib.auth import authenticate, login, logout

from webapi.manager import user_manager, cache_manager
from webapi.constants import StatusCode
from webapi.utils import api_response


@api_response()
def user_signup(request):
	params = request.POST
	email = params.get("email", None)
	if email is None:
		raise Exception(StatusCode.MISSING_PARAMETER)
	user_manager.ensure_valid_email_format(email=email)
	user_manager.ensure_unique_email(email=email)
	user_manager.register_email(email)


@api_response()
def check_activation_link(request):
	params = request.GET
	email = params.get("email", None)
	token = params.get("token", None)
	if not all([email, token]):
		raise Exception(StatusCode.MISSING_PARAMETER)
	cache_manager.ensure_valid_email_activation_token(email, token)


@api_response()
def user_activate(request):
	params = request.POST
	email = params.get("email", None)
	token = params.get("token", None)
	username = params.get("username", None)
	password = params.get("password", None)
	major = params.get("major", None)
	if not all([email, token, username, password]):
		raise Exception(StatusCode.MISSING_PARAMETER)
	user_manager.ensure_unique_email(email=email)
	user_manager.ensure_unique_appropriate_username(username=username)
	cache_manager.ensure_valid_email_activation_token(email, token)

	user = user_manager.create_or_update_user_by_email(email=email, username=username, password=password, is_active=True)
	user_manager.update_user_profile(user, major=major)
	login(request, user)
	cache_manager.remove_activation_token_from_cache(email=email)


@api_response()
def user_login(request):
	params = request.POST
	email = params.get("email", None)
	password = params.get("password", None)
	if not all([email, password]):
		raise Exception(StatusCode.MISSING_PARAMETER)

	username = user_manager.get_username_by_email(email)
	if not username:
		raise Exception(StatusCode.INVALID_EMAIL_PASSWORD)
	user = authenticate(request, username=username, password=password)
	if not user:
		raise Exception(StatusCode.INVALID_EMAIL_PASSWORD)
	if not user.is_active:
		raise Exception(StatusCode.NOT_ACTIVATED)

	login(request, user)


@api_response(login_required=True)
def user_logout(request):
	logout(request)


@api_response(login_required=True)
def get_user_profile(request):
	return user_manager.prepare_profile_data(request.user)


@api_response(login_required=True)
def update_user_profile(request):
	user = request.user
	params = request.POST
	username = params.get("username", None)
	major = params.get("major", None)
	avatar = params.get("avatar", None)
	user_manager.ensure_unique_appropriate_username(username=username, user_id=user.id)

	if username:
		user.username = username
		user.save()
	user_manager.update_user_profile(user, major=major, avatar=avatar)


@api_response(login_required=True)
def get_user_schedule(request):
	return user_manager.prepare_schedule_data(request.user)


@api_response(login_required=True)
def update_user_schedule(request):
	params = request.POST
	schedule = params.get("schedule", None)
	if schedule is None:
		raise Exception(StatusCode.MISSING_PARAMETER)
	user_manager.update_user_profile(request.user, schedule=schedule)
