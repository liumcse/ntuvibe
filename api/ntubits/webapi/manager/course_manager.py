from api.ntubits.webapi.models import (
	CourseTab,
	UserTab,
	CourseRatingTab,
	ProfessorTab,
	ProfessorRatingTab,
	ScheduleTab
)
from api.ntubits.webapi import utils

def get_course_by_courseid(courseid):
	return CourseTab.objects.filter(id=courseid).first()


def get_course_by_course_code(course_code):
	return CourseTab.objects.filter(course_code=course_code).first()


def get_courses_by_course_title(course_title):
	return CourseTab.objects.filter(name=course_title)


def get_courses_by_search(course_code=None, course_name=None):
	if course_name is None and course_code is None:
		return None
	course = CourseTab.objects
	if course_code:
		course = course.filter(course_code__icontains=course_code)
	if course_name:
		course = course.filter(name__icontains=course_name)
	return course


def get_courses(**kwargs):
	return CourseTab.objects.filter(**kwargs)


def add_course(course_code, course_title, description=None, last_updated=None):
	course = CourseTab(
		course_code=course_code,
		name=course_title,
		description="" if not description else description,
		last_updated=utils.now() if not last_updated else last_updated,
		ctime=utils.now()
	)
	course.create()

