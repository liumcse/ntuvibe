from django.http import JsonResponse
from webapi.constants import VALID_EMAIL_DOMAIN
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from webapi.manager import (
	course_manager,
	course_rating_manager,
	prof_manager,
	prof_rating_manager,
)
from .constants import DEFAULT_COURSE_LIST_OFFSET, DEFAULT_COURSE_LIST_LIMIT



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

	try:
		user = User.objects.create_user(username, email, password)
	except Exception as e:
		result['error'] = str(e)
		return JsonResponse(result)

