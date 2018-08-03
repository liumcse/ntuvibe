from django.http import JsonResponse
from webapi.constants import VALID_EMAIL_DOMAIN
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from webapi.manager import (
	user_manager,
	course_manager,
	course_rating_manager,
	prof_manager,
	prof_rating_manager,
)


def sign_up(request):
	result = {'success': False}
	param = request.POST
	username = param.get("username", None)
	email = param.get("email", None)
	password = param.get('password', None)
	if any(username, email, password) is None:
		result['error'] = 'param error'
		return JsonResponse(result)

	if email.split('@')[1] not in VALID_EMAIL_DOMAIN:
		result['error'] = 'not ntu email'
		return JsonResponse(result)

	result = user_manager.register_user(username, email, password)

	return JsonResponse(result)


def login(request):
	param = request.POST
	username = param.get('username', None)
	password = param.get('password', None)
	if any(username, password) is None:
		return JsonResponse({'success': False, 'error': 'invalid param'})

	user = authenticate(request, username, password)
	if user is None:
		return JsonResponse({'success': False, 'error': 'not registered'})

	if not user.is_active:
		return JsonResponse({"success": False, 'error': 'user has not verified email'})

	login(request, user)


def logout(request):
	if request.user and request.user.is_authenticated:
		logout(request)
		return JsonResponse({'success': True})
	return ({'success': False, 'error': 'user not logged in'})


def activate_email(request, username):
	user = user_manager.get_user_by_username(username)
	user.is_active = True
	user.save()
	pass