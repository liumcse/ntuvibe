import re
from django.contrib.auth import authenticate, login, logout

from webapi.manager import user_manager, cache_manager
from webapi.constants import VALID_EMAIL_DOMAIN, StatusCode
from webapi.utils import api_response


@api_response()
def user_signup(request):
	params = request.POST
	email = params.get("email", None)
	if email is None:
		raise Exception(StatusCode.MISSING_PARAMETER)

	email_pattern = re.compile(".+@.+")
	if not email_pattern.match(email):
		raise Exception(StatusCode.INVALID_NTU_EMAIL)
	if email.split('@')[-1] not in VALID_EMAIL_DOMAIN:
		raise Exception(StatusCode.INVALID_NTU_EMAIL)

	user_manager.register_email(email)


@api_response()
def check_activation_link(request):
	params = request.GET
	email = params.get('email', None)
	token = params.get('token', None)
	if any((email, token)) is None:
		raise Exception(StatusCode.MISSING_PARAMETER)

	if not cache_manager.validate_email_activation_token(email, token):
		raise Exception(StatusCode.INVALID_ACTIVATION_TOKEN)


@api_response()
def user_activate(request):
	param = request.POST
	email = param.get('email', None)
	token = param.get('token', None)
	username = param.get('username', None)
	password = param.get('password', None)
	major = param.get('major', None)

	if any((email, token, username, password)) is None:
		raise Exception(StatusCode.MISSING_PARAMETER)

	user_with_same_email = user_manager.get_user_by_email(email)
	if user_with_same_email:
		raise Exception(StatusCode.DUPLICATE_EMAIL)

	user_with_same_username = user_manager.get_user_by_username(username)
	if user_with_same_username:
		raise Exception(StatusCode.DUPLICATE_USERNAME)

	if not cache_manager.validate_email_activation_token(email, token):
		raise Exception(StatusCode.INVALID_ACTIVATION_TOKEN)

	cache_manager.remove_activation_token_from_cache(email=email)
	user = user_manager.create_or_update_user_by_email(email=email, username=username, password=password, is_active=True)
	user_manager.update_user_profile(user, major=major)
	login(request, user)


@api_response()
def user_login(request):
	param = request.POST
	email = param.get('email', None)
	password = param.get('password', None)
	if any((email, password)) is None:
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
