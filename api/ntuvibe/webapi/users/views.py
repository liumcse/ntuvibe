from django.http import JsonResponse
from webapi.constants import VALID_EMAIL_DOMAIN
from webapi import utils
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from webapi.manager import (
	user_manager,
)
import re


def user_signup(request):
	result = {'success': False}
	param = request.GET
	username = param.get("username", None)
	email = param.get("email", None)
	password = param.get('password', None)
	if any((username, email, password)) is None:
		result['error'] = 'param error'
		return JsonResponse(result)

	email_pattern = re.compile(".+@.+")
	if not email_pattern.match(email):
		result['error'] = 'invalid email format'
		return JsonResponse(result)
	if email.split('@')[-1] not in VALID_EMAIL_DOMAIN:
		result['error'] = 'not ntu email'
		return JsonResponse(result)

	result = user_manager.register_user(username, email, password)

	return JsonResponse(result)


def user_login(request):
	param = request.GET
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


def user_activate(request):
	param = request.GET
	email = param.get('email', None)
	token = param.get('token', None)
	if any((email, token)) is None:
		return JsonResponse({'success': False, 'error': 'invalid param'})

	user = user_manager.get_user_by_username(email)
	if not user:
		return JsonResponse({'success': False, 'error': 'not signed up'})

	if utils.validate_email_activation_token(email, token):
		user.is_active = True
		user.save()
		login(request, user)
		return JsonResponse({'success': True})
	return JsonResponse({'success': False, 'error': 'not validated'})
