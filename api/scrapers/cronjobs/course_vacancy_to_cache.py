import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../")
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../api/ntuvibe")
sys.path.append("/home/ubuntu/.local/lib/python3.5/site-packages")
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ntuvibe.settings")
django.setup()

from webapi.models import *
from webapi.manager import cache_manager
from scrapers.scraper_course_vacancy import crawl_course_vacancy


def get_current_semester():
	return "2018_1"  # TO DO: get from ConfigTab


def get_course_codes_current_semester():
	current_semester = get_current_semester()
	course_codes = CourseTab.objects.filter(semesters__contains=current_semester).values_list("course_code", flat=True)
	return [course_code for course_code in course_codes]


if __name__ == "__main__":
	course_code_list = get_course_codes_current_semester()
	for course_code in course_code_list:
		course_vacancy = crawl_course_vacancy.get_course_vacancy_by_request(course_code)
		cache_manager.set_course_vacancy(course_code, course_vacancy)

