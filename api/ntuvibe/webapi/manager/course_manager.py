from webapi.models import (
	CourseTab,
	UserTab,
	CourseRatingTab,
	ProfessorTab,
	ProfessorRatingTab,
	ClassScheduleTab
)
from webapi.utils import get_timestamp


def get_course_by_courseid(courseid):
	return CourseTab.objects.filter(id=courseid).first()


def get_course_by_course_code(course_code):
	return CourseTab.objects.filter(course_code=course_code).first()


def get_courses_by_course_title(course_title):
	return CourseTab.objects.filter(title=course_title)


def get_courses_by_search(course_code=None, course_title=None):
	if course_title is None and course_code is None:
		return []
	course = CourseTab.objects
	if course_code:
		course = course.filter(course_code__icontains=course_code)
	if course_title:
		course = course.filter(course_title__icontains=course_title)
	return course


def get_courses(**kwargs):
	return CourseTab.objects.filter(**kwargs)


def add_course(course_code, course_title, description=None, update_time=None):
	CourseTab.objects.create(
		course_code=course_code,
		course_title=course_title,
		description="" if not description else description,
		update_time=get_timestamp() if not update_time else update_time,
		create_time=get_timestamp()
	)


def prepare_course_detail_dict(course):
	return {

	}


def prepare_course_list_dict(courses):
	data = [
		{
			"code": course.course_code,
			"title": course.course_title,
		}
		for course in courses
	]
	response_dict = {'data': data}
	return response_dict
