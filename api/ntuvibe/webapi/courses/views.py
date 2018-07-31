from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from webapi.manager import (
	course_manager,
	course_rating_manager,
	class_schedule_manager,
	exam_schedule_manager,
)


def get_course_list(request):
	courses = course_manager.get_courses()
	response_dict = course_manager.prepare_course_list_dict(courses)
	return JsonResponse(response_dict)


def get_course_detail(request):
	params = request.GET
	course_code = params.get("code", None)
	course = course_manager.get_course_by_course_code(course_code)
	response_dict = course_manager.prepare_course_detail_dict(course)
	return JsonResponse(response_dict)


def get_class_schedule(request):
	params = request.GET
	course_code = params.get("code", None)
	course_id = course_manager.get_course_by_course_code(course_code).id
	class_schedules = class_schedule_manager.get_class_schedules(course_id=course_id)
	response_dict = class_schedule_manager.prepare_class_schedule_dict(class_schedules)
	return JsonResponse(response_dict)


def get_exam_schedule(request):
	params = request.GET
	course_code = params.get("code", None)
	course_id = course_manager.get_course_by_course_code(course_code).id
	exam_schedule = exam_schedule_manager.get_exam_schedule_by_course_id(course_id)
	response_dict = exam_schedule_manager.prepare_exam_schedule_dict(exam_schedule)
	return JsonResponse(response_dict)


@csrf_exempt
def add_course_rating(request, course_id):
	try:
		user_id = 'adding in after adding in login system'
		param = request.POST
		easy = param.get("easy", None)
		useful = param.get("useful", None)
		like = param.get("like", None)
		comment = param.get("comment", None)
		if easy is None or useful is None or like is None:
			return JsonResponse({'success': False, 'error': 'param error'})

		if not course_manager.get_course_by_course_id(course_id):
			return JsonResponse({"success": False, "error": 'invalid course_id'})

		course_rating_manager.add_rating(user_id, course_id, easy, useful, like, comment=comment)
		return JsonResponse({'success': True})
	except Exception as e:
		return JsonResponse({'success': False, "error": str(e)})
