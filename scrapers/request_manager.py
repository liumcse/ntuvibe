import requests
from scrapers.constants import *


def get(url, *args, **kwargs):
    return requests.get(url, params=kwargs).text.encode('utf-8')


def post(url, headers, data, verify=False):
    return requests.post(url, data=data, headers=headers, verify=verify)


def retrieve_main_html():
    return get(COURSE_CONTENT_MAIN_URL)


def retrieve_semester_list_html(semester):
    return get(COURSE_CONTENT_SEMESTER_URL, acadsem=semester, acad="", semester="")


def retrieve_detail_html(semester, category):
    return get(COURSE_CONTENT_DETAIL_URL,
               acadsem=semester,
               r_course_yr=category,
               r_subj_code="Enter Keywords or Course Code",
               boption="CLoad",
               acad=semester[0:4],
               semester=semester[-1])
