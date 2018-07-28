from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from webapi.manager import course_manager, course_rating_manager
from .constants import DEFAULT_COURSE_LIST_OFFSET, DEFAULT_COURSE_LIST_LIMIT


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

		course_rating_manager.add_rating(userid, courseid, easy, useful, like, comment=comment)
		return JsonResponse({'success': True})
	except Exception as e:
		return JsonResponse({'success': False, "error": e.args[0]})


