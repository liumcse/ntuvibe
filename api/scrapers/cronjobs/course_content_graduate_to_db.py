import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../")
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ntuvibe.settings")
django.setup()

import json
from webapi.models import *
from scrapers.constants import *
from scrapers.scraper_course_content_graduate import crawl_course_content_graduate


def record_course_content(semester, course_code, course_content):
	kwargs = {
		"course_title": course_content["title"],
		"au": float(course_content["au"]),
		"description": course_content["description"],
		"constraint": json.dumps({"is_for_graduate": True}),
		"grade_type": GradeType.READABLE_TO_ID["Default"],
		"as_pe": False,
		"as_ue": False,
	}

	course = CourseTab.objects.filter(course_code=course_code).first()
	semester = semester[:-1] + "_" + semester[-1]  # e.g. 20183 -> 2018_3
	if course:
		semesters = json.loads(course.semesters.replace("\'", "\""))
		semesters.append(semester)
		semesters = sorted(list(set(semesters)))
		kwargs.update({"semesters": json.dumps(semesters)})
		CourseTab.objects.filter(course_code=course_code).update(**kwargs)
	else:
		kwargs.update({"semesters": json.dumps([semester])})
		CourseTab.objects.create(course_code=course_code, **kwargs)


if __name__ == "__main__":
	if len(sys.argv) == 1:
		semester = crawl_course_content_graduate.get_latest_semester()
	elif len(sys.argv) == 2:
		# Example of semester: "20181", "20182", "20183"
		semester = sys.argv[1]
	else:
		raise Exception("Invalid sys.argv length!")

	course_contents = crawl_course_content_graduate.crawl(semester=semester)
	print("Number of Course Contents Found: {}".format(len(course_contents.items())))
	for course_code, course_content in course_contents.items():
		record_course_content(semester, course_code, course_content)
