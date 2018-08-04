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
	course_id = course_manager.get_course_id_by_course_code(course_code)
	class_schedules = class_schedule_manager.get_class_schedules(course_id=course_id)
	response_dict = class_schedule_manager.prepare_class_schedule_dict(class_schedules)
	return JsonResponse(response_dict)


def get_exam_schedule(request):
	params = request.GET
	course_code = params.get("code", None)
	course_id = course_manager.get_course_id_by_course_code(course_code)
	exam_schedule = exam_schedule_manager.get_exam_schedule_by_course_id(course_id)
	response_dict = exam_schedule_manager.prepare_exam_schedule_dict(exam_schedule)
	return JsonResponse(response_dict)


def get_course_rating(request):
	params = request.GET
	course_code = params.get("code", None)
	course_id = course_manager.get_course_id_by_course_code(course_code)
	response_dict = course_rating_manager.prepare_total_rating_dict(course_id)
	return JsonResponse(response_dict)


def get_course_comments(request):
	params = request.GET
	course_code = params.get("code", None)
	course_id = course_manager.get_course_id_by_course_code(course_code)
	rating_records = course_rating_manager.get_rating_records_by_course_id(course_id)
	response_dict = course_rating_manager.prepare_comments_dict(rating_records)
	return JsonResponse(response_dict)


# login required
@csrf_exempt
def submit_course_rating(request):
	try:
		user_id = 1  # TO DO: adding in after adding in login system
		params = request.GET
		easy = params.get("easy", None)
		useful = params.get("useful", None)
		like = params.get("like", None)
		comment = params.get("comment", None)
		course_code = params.get("code", None)
		course_id = course_manager.get_course_id_by_course_code(course_code)
		if easy is None or useful is None or like is None:
			return JsonResponse({"error_message": "param error"})

		if not course_manager.get_course_by_course_id(course_id):
			return JsonResponse({"error_message": 'invalid course_id'})

		course_rating_manager.add_rating_record(user_id, course_id, easy, useful, like, comment=comment)
		return JsonResponse({"success": True})
	except Exception as e:
		return JsonResponse({"error_message": str(e)})



