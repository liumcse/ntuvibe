from webapi.models import CourseTab
from webapi.utils import get_timestamp


def get_course_by_course_id(course_id):
	return CourseTab.objects.filter(id=course_id).first()


def get_course_by_course_code(course_code):
	return CourseTab.objects.filter(course_code=course_code).first()


def get_course_id_by_course_code(course_code):
	course = CourseTab.objects.filter(course_code=course_code).first()
	if course:
		return course.id
	else:
		return None


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


def add_course(course_code, course_title, au, constraint, grade_type, as_pe=False, as_ue=False, description=None):
	CourseTab.objects.create(
		course_code=course_code,
		course_title=course_title,
		au=au,
		constraint=constraint,
		grade_type=grade_type,
		as_pe=as_pe,
		as_ue=as_ue,
		description="" if not description else description,
	)


def prepare_course_list_data(courses):
	return [{"code": course.course_code, "title": course.course_title} for course in courses]


def prepare_course_detail_data(course):
	constraint = eval(course.constraint)
	return {
		"title": course.course_title,
		"au": str(int(course.au)),
		"description": course.description,
		"constraint": {
			"prerequisite": constraint.get("prerequisite", ""),
			"mutex": constraint.get("mutex", ""),
		},
		"as_pe": course.as_pe,
		"as_ue": course.as_ue,
	}


