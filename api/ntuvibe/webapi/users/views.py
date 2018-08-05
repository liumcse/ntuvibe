import re

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from webapi.manager import user_manager
from webapi.constants import VALID_EMAIL_DOMAIN
from webapi import utils



def user_signup(request):
	result = {'success': False}
	param = request.POST
	email = param.get("email", None)
	if email is None:
		result['error'] = 'param error'
		return JsonResponse(result)

	email_pattern = re.compile(".+@.+")
	if not email_pattern.match(email):
		result['error'] = 'invalid email format'
		return JsonResponse(result)
	if email.split('@')[-1] not in VALID_EMAIL_DOMAIN:
		result['error'] = 'not ntu email'
		return JsonResponse(result)

	result = user_manager.register_email(email)
	return JsonResponse(result)


def check_activation_link(request):
	params = request.GET
	email = params.get('email', None)
	token = params.get('token', None)
	if any((email, token)) is None:
		return JsonResponse({'success': False, 'error': 'invalid param'})

	if utils.validate_email_activation_token(email, token):
		return JsonResponse({'success': True})
	else:
		return JsonResponse({'success': False, 'error': 'token invalid or expired'})


def user_activate(request):
	param = request.POST
	email = param.get('email', None)
	token = param.get('token', None)
	username = param.get('username', None)
	password = param.get('password', None)
	major = param.get('major', None)

	if any((email, token, username, password)) is None:
		return JsonResponse({'success': False, 'error': 'invalid param'})

	user_with_same_email = user_manager.get_user_by_email(email)
	if user_with_same_email:
		return JsonResponse({'success': False, 'error': 'same email already exists'})

	user_with_same_username = user_manager.get_user_by_username(username)
	if user_with_same_username:
		return JsonResponse({'success': False, 'error': 'same username already exists'})

	if not utils.validate_email_activation_token(email, token):
		return JsonResponse({'success': False, 'error': 'invalid or expired token'})

	utils.remove_activation_token_from_cache(email=email)
	user = user_manager.create_or_update_user_by_email(email=email, username=username, password=password, is_active=True)
	user_manager.update_user_profile(user, major=major)
	login(request, user)
	return JsonResponse({'success': True})


def user_login(request):
	param = request.POST
	email = param.get('email', None)
	password = param.get('password', None)
	if any((email, password)) is None:
		return JsonResponse({'success': False, 'error': 'invalid param'})

	username = user_manager.get_username_by_email(email)
	if not username:
		return JsonResponse({'success': False, 'error': 'invalid email or password'})

	user = authenticate(request, username=username, password=password)
	if user is None:
		return JsonResponse({'success': False, 'error': 'invalid email or password'})
	if not user.is_active:
		return JsonResponse({"success": False, 'error': 'user not activated'})

	login(request, user)
	return JsonResponse({"success": True})


def user_logout(request):
	if request.user and request.user.is_authenticated:
		logout(request)
		return JsonResponse({'success': True})
	return JsonResponse({'success': False, 'error': 'user not logged in'})


def get_user_profile(request):
	if request.user and request.user.is_authenticated:
		response_dict = user_manager.prepare_profile_dict(request.user)
		return JsonResponse(response_dict)
	else:
		return JsonResponse({'success': False, 'error': 'user not logged in', "data": None})
