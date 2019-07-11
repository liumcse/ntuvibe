import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../")
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ntuvibe.settings")
django.setup()

import json
from webapi.models import *
from scraper.constants import *
from scraper.scraper_course_content import crawl_course_content


def get_constraint_string(course_content):
	constraint_pairs = []
	for key in CONSTRING_KEYS:
		if course_content.get(key):
			constraint_pairs.append((key, course_content[key]))
	constraints = dict(constraint_pairs)
	return json.dumps(constraints)


def record_course_content(semester, course_code, course_content):
	kwargs = {
		"course_title": course_content["title"],
		"au": float(course_content["au"]),
		"description": course_content["description"],
		"constraint": get_constraint_string(course_content),
		"grade_type": GradeType.READABLE_TO_ID[course_content.get("grade_type", "Default")],
		"as_pe": False,
		"as_ue": False,
	}

	course = CourseTab.objects.filter(course_code=course_code).first()
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
		semester = crawl_course_content.get_latest_semester()
	elif len(sys.argv) == 2:
		semester = sys.argv[1]

	else:
		raise Exception("Invalid sys.argv length!")

	course_contents = crawl_course_content.crawl(semester=semester)
	print("Number of Course Contents Found: {}".format(len(course_contents.items())))
	for course_code, course_content in course_contents.items():
		record_course_content(semester, course_code, course_content)
