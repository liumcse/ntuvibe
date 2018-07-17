import requests
from scrapers.constants import *


def get(url, *args, **kwargs):
    return requests.get(url, params=kwargs).text.encode('utf-8')


def post(url, headers, data, verify=False):
    return requests.post(url, data=data, headers=headers, verify=verify)


def get_course_content_main_html():
    return get(COURSE_CONTENT_MAIN_URL)


def get_course_content_category_list_html(semester):
    return get(COURSE_CONTENT_CATEGORY_URL, acadsem=semester, acad="", semester="")


def get_course_content_detail_html(semester, category):
    return get(COURSE_CONTENT_DETAIL_URL,
               acadsem=semester,
               r_course_yr=category,
               r_subj_code="Enter Keywords or Course Code",
               boption="CLoad",
               acad=semester[0:4],
               semester=semester[-1])


def get_class_schedule_main_html():
    return get(CLASS_SCHEDULE_MAIN_URL)


def get_class_schedule_category_list_html(semester):
    return get(CLASS_SCHEDULE_CATEGORY_URL,
               acadsem=semester,
               r_subj_code="Enter Keywords or Course Code",
               r_search_type="F",
               boption="x",
               staff_access="false")


def get_class_schedule_detail_html(semester, category):
    return get(CLASS_SCHEDULE_DETAIL_URL,
               acadsem=semester,
               r_course_yr=category,
               r_subj_code="Enter Keywords or Course Code",
               boption="CLoad",
               staff_access="false")


def get_exam_schedule_main_html():
    return get(EXAM_SCHEDULE_MAIN_URL, p_opt=1, bOption="Next")


def get_exam_schedule_detail_html(academic_year, semester):
    return get(EXAM_SCHEDULE_DETAIL_URL,
               p_exam_dt="",
               p_start_time="",
               p_dept="",
               p_subj="",
               p_venue="",
               p_matric="",
               academic_session="Semester %s Academic Year %s-%s" % (semester, int(academic_year), int(academic_year)+1),
               p_plan_no=EXAM_SCHEDULE_USEFUL_SEMESTER_VALUE,
               p_exam_yr=academic_year,
               p_semester=semester,
               bOption="Next")
