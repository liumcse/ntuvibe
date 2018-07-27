from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from api.ntuvibe.webapi.constants import STATIC_FILE_PATH
from api.ntuvibe.webapi.manager import course_manager, course_rating_manager


def get_course_detail(request, course_code):
	course = course_manager.get_course_by_course_code(course_code)
	#according to course id here, find the corresponding course json file in static folder
	path = STATIC_FILE_PATH + str(course.id)
	course_detail = path
	return JsonResponse(course_detail)


def get_course_list(request):
	param = request.POST
	offset = param.get("offset", 0)
	limit = param.get("limit", 30)
	course_code = param.get("course_code", None)
	course_name = param.get("course_name", None)
	if not course_code and not course_name:
		courses = course_manager.get_courses()
	courses = course_manager.get_courses_by_search(course_code=course_code, course_name=course_name)
	courses = courses[offset: offset+limit]

	data = []
	for course in courses:
		row = {
			"course_id": course.id,
			"course_name": course.name,
			"couser_code": course.course_code,
		}
		data.append(row)

	return JsonResponse(data)


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
		return JsonResponse({'success': False, "error": e.message})


