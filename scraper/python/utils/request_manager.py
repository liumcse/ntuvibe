import requests
from .constants import *


class RequestManager:
    @staticmethod
    def get(url, *args, **kwargs):
        return requests.get(url, params=kwargs).text.encode('utf-8')

    @staticmethod
    def post(url, headers, data, verify=False):
        return requests.post(url, data=data, headers=headers, verify=verify).text.encode('utf-8')

    @staticmethod
    def get_course_content_main_html():
        return RequestManager.get(COURSE_CONTENT_MAIN_URL)

    @staticmethod
    def get_course_content_detail_html(semester):
        return RequestManager.get(
            COURSE_CONTENT_DETAIL_URL,
            acadsem=semester,
            r_course_yr="",
            r_subj_code="",
            boption="Search",
            acad=semester[0:4],
            semester=semester[-1]
        )

    @staticmethod
    def get_course_content_graduate_main_html():
        return RequestManager.get(COURSE_CONTENT_GRADUATE_MAIN_URL, in_acad="")

    @staticmethod
    def get_course_content_graduate_semester_html(semester):
        return RequestManager.get(COURSE_CONTENT_GRADUATE_SEMESTER_URL, in_acad=semester)

    @staticmethod
    def get_course_content_graduate_detail_html(semester, category):
        return RequestManager.get(
            COURSE_CONTENT_GRADUATE_DETAIL_URL,
            s_acad=semester,
            s_course=category,
        )

    @staticmethod
    def get_class_schedule_main_html():
        return RequestManager.get(CLASS_SCHEDULE_MAIN_URL)

    @staticmethod
    def get_class_schedule_detail_html(semester):
        return RequestManager.get(
            CLASS_SCHEDULE_DETAIL_URL,
            acadsem=semester,
            r_course_yr="",
            r_search_type="F",
            r_subj_code="",
            boption="Search",
            staff_access="false"
        )

    @staticmethod
    def get_exam_schedule_main_html():
        return RequestManager.get(EXAM_SCHEDULE_MAIN_URL, p_opt=1, bOption="Next")

    @staticmethod
    def get_exam_schedule_detail_html(academic_year, semester):
        if semester == "1":
            useful_semester_value = EXAM_SCHEDULE_SEMESTER_VALUE_1
        elif semester == "2":
            useful_semester_value = EXAM_SCHEDULE_SEMESTER_VALUE_2
        else:
            raise Exception("Invalid Semester for Request!")
        return RequestManager.get(
            EXAM_SCHEDULE_DETAIL_URL,
            p_exam_dt="",
            p_start_time="",
            p_dept="",
            p_subj="",
            p_venue="",
            p_matric="",
            academic_session="Semester %s Academic Year %s-%s" % (
                semester, int(academic_year), int(academic_year) + 1),
            p_plan_no=useful_semester_value,
            p_exam_yr=academic_year,
            p_semester=semester,
            bOption="Next"
        )

    @staticmethod
    def get_course_vacancy(subj):
        return RequestManager.get(COURSE_VACANCIES_URL, subj=subj)
