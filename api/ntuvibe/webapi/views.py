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


def get_course_detail(request, course_code):
	course = course_manager.get_course_by_course_code(course_code)

	response_dict = course_manager.prepare_course_detail_dict(course)
	return JsonResponse(response_dict)


def get_course_list(request):
	param = request.POST
	offset = param.get("offset", DEFAULT_COURSE_LIST_OFFSET)
	limit = param.get("limit", DEFAULT_COURSE_LIST_LIMIT)
	course_code = param.get("course_code", None)
	course_title = param.get("course_title", None)

	try:
		if not course_code and not course_title:
			courses = course_manager.get_courses()
		courses = course_manager.get_courses_by_search(course_code=course_code, course_title=course_title)
		courses = courses[offset: offset+limit]

		response_dict = course_manager.prepare_course_list_dict(courses)
		return JsonResponse(response_dict)
	except Exception as e:
		return JsonResponse({'success': False, "error": e.args[0]})


@csrf_exempt
def add_course_rating(request, courseid):
	try:
		userid = 'adding in after adding in login system'
		param = request.POST
		easy = param.get("easy", None)
		useful = param.get("useful", None)
		like = param.get("like", None)
		comment = param.get("comment", None)
		if easy is None or useful is None or like is None:
			return JsonResponse({'success': False, 'error': 'param error'})

		if not course_manager.get_course_by_courseid(courseid):
			return JsonResponse({"success": False, "error": 'invalid courseid'})

		course_rating_manager.add_rating(userid, courseid, easy, useful, like, comment=comment)
		return JsonResponse({'success': True})
	except Exception as e:
		return JsonResponse({'success': False, "error": str(e)})


def create_prof(request, courseid):
	if not course_manager.get_course_by_courseid(courseid):
		return JsonResponse({"success": False, "error": 'invalid courseid'})

	param = request.POST
	name = param.get('name', None)
	title = param.get('title', None)
	photo = param.get('photo', None)
	description = param.get('description', None)
	if any(name, title, description) is None:
		return JsonResponse({"success": False, "error": 'invalid courseid'})

	try:
		prof_manager.add_professor(courseid, name, title, photo, description)
	except Exception as e:
		return JsonResponse({'success': False, "error": str(e)})

	return JsonResponse({'success': True})

def add_prof_rating(request, profid):
	result = {'success': False}
	userid = 'logged in user id'

	if not prof_manager.get_professor_by_profid(profid):
		result['error'] = 'prof does not exist'
		return JsonResponse(result)

	param = request.POST
	clarity = param.get('clarity', None)
	enthusiasm = param.get("enthusiasm", None)
	helpful = param.get('helpful', None)
	comment = param.get("comment", None)
	if any(clarity, enthusiasm, helpful) is None:
		result['error'] = "param error"
		return JsonResponse(result)

	try:
		prof_rating_manager.add_prof_rating(userid, profid, clarity. enthusiasm, helpful, comment)
	except Exception as e:
		result['error'] = str(e)
		return JsonResponse(result)

	result['success'] = True
	return JsonResponse(result)


