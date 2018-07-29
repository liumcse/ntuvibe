import os
import django
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../")
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../api/ntuvibe")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ntuvibe.settings")
django.setup()

from webapi.models import *
from scrapers.utils import get_timestamp
from scrapers.constants import *
from scrapers.scraper_course_content import crawl_course_content


def get_constraint_string(course_content):
	constraint = dict([(key, course_content.get(key, None)) for key in CONSTRING_KEYS])
	return str(constraint)


def record_course_content(course_code, course_content):
	kwargs = {
		"course_title": course_content["title"],
		"au": float(course_content["au"]),
		"description": course_content["description"],
		"constraint": str(get_constraint_string(course_content)),
		"grade_type": GradeType.READABLE_TO_ID[course_content.get("grade_type", "Default")],
		"as_pe": False,
		"as_ue": False,
		"update_time": get_timestamp(),
	}

	result = CourseTab.objects.filter(course_code=course_code).update(**kwargs)
	if not result:
		CourseTab.objects.create(course_code=course_code, create_time=get_timestamp(), **kwargs)


if __name__ == "__main__":
	course_contents = crawl_course_content.crawl()
	for course_code, course_content in course_contents.items():
		record_course_content(course_code, course_content)
