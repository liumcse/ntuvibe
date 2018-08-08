from webapi.utils import api_response, log
from webapi.constants import StatusCode

from webapi.manager import (
	course_manager,
	course_rating_manager,
	class_schedule_manager,
	exam_schedule_manager,
)


@api_response()
def get_course_list(request):
	courses = course_manager.get_courses()
	return course_manager.prepare_course_list_data(courses)


@api_response()
def get_course_detail(request):
	params = request.GET
	course_code = params.get("code", None)
	course = course_manager.get_course_by_course_code(course_code)
	return course_manager.prepare_course_detail_data(course)


@api_response()
def get_class_schedule(request):
	params = request.GET
	course_code = params.get("code", None)
	course_id = course_manager.get_course_id_by_course_code(course_code)
	class_schedules = class_schedule_manager.get_class_schedules(course_id=course_id)
	return class_schedule_manager.prepare_class_schedule_data(class_schedules)


@api_response()
def get_exam_schedule(request):
	params = request.GET
	course_code = params.get("code", None)
	course_id = course_manager.get_course_id_by_course_code(course_code)
	exam_schedule = exam_schedule_manager.get_exam_schedule_by_course_id(course_id)
	return exam_schedule_manager.prepare_exam_schedule_data(exam_schedule)


@api_response()
def get_course_rating(request):
	params = request.GET
	course_code = params.get("code", None)
	course_id = course_manager.get_course_id_by_course_code(course_code)
	return course_rating_manager.prepare_total_rating_data(course_id)


@api_response()
def get_course_comments(request):
	params = request.GET
	course_code = params.get("code", None)
	course_id = course_manager.get_course_id_by_course_code(course_code)
	rating_records = course_rating_manager.get_rating_records_by_course_id(course_id)
	return course_rating_manager.prepare_comments_data(rating_records)


@api_response(login_required=True)
def get_user_course_comment(request):
	params = request.POST
	course_code = params.get('code', None)
	course_id = course_manager.get_course_by_course_code(course_code)
	user_id = request.user.pk
	rating_records = course_rating_manager.get_rating_records_by_course_id_user_id(course_id, user_id)
	return course_rating_manager.prepare_comments_data(rating_records)


@api_response(login_required=True)
def submit_course_rating(request):
	user_id = request.user.pk
	params = request.POST
	easy = params.get("easy", None)
	useful = params.get("useful", None)
	like = params.get("like", None)
	comment = params.get("comment", "")
	course_code = params.get("code", None)
	course_id = course_manager.get_course_id_by_course_code(course_code)

	if not all([easy, useful, like]):
		raise Exception(StatusCode.MISSING_PARAMETER)

	if not course_manager.get_course_by_course_id(course_id):
		raise Exception(StatusCode.INVALID_COURSE_ID)

	course_rating_manager.add_or_update_rating_record(user_id, course_id, easy, useful, like, comment)
