import requests
from scrapers.constants import *


def get(url, *args, **kwargs):
	return requests.get(url, params=kwargs).text.encode('utf-8')


def post(url, headers, data, verify=False):
	return requests.post(url, data=data, headers=headers, verify=verify).text.encode('utf-8')


def get_course_content_main_html():
	return get(COURSE_CONTENT_MAIN_URL)


def get_course_content_detail_html(semester):
	return get(
		COURSE_CONTENT_DETAIL_URL,
		acadsem=semester,
		r_course_yr="",
		r_subj_code="",
		boption="Search",
		acad=semester[0:4],
		semester=semester[-1]
	)


def get_class_schedule_main_html():
	return get(CLASS_SCHEDULE_MAIN_URL)


def get_class_schedule_detail_html(semester):
	return get(
		CLASS_SCHEDULE_DETAIL_URL,
		acadsem=semester,
		r_course_yr="",
		r_search_type="F",
		r_subj_code="",
		boption="Search",
		staff_access="false"
	)


def get_exam_schedule_main_html():
	return get(EXAM_SCHEDULE_MAIN_URL, p_opt=1, bOption="Next")


def get_exam_schedule_detail_html(academic_year, semester):
	if semester == "1":
		useful_semester_value = EXAM_SCHEDULE_SEMESTER_VALUE_1
	elif semester == "2":
		useful_semester_value = EXAM_SCHEDULE_SEMESTER_VALUE_2
	else:
		raise Exception("Invalid Semester for Request!")
	return get(
		EXAM_SCHEDULE_DETAIL_URL,
		p_exam_dt="",
		p_start_time="",
		p_dept="",
		p_subj="",
		p_venue="",
		p_matric="",
		academic_session="Semester %s Academic Year %s-%s" % (semester, int(academic_year), int(academic_year)+1),
		p_plan_no=useful_semester_value,
		p_exam_yr=academic_year,
		p_semester=semester,
		bOption="Next"
	)


def get_course_vacancy(subj):
	return get(COURSE_VACANCIES_URL, subj=subj)
