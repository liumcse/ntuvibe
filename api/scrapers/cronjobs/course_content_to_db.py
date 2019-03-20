import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../")
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ntuvibe.settings")
django.setup()

from webapi.models import *
from scrapers.utils import get_timestamp
from scrapers.constants import *
from scrapers.scraper_course_content import crawl_course_content


def get_constraint_string(course_content):
	constraint_pairs = []
	for key in CONSTRING_KEYS:
		if course_content.get(key):
			constraint_pairs.append((key, course_content[key]))
	constraints = dict(constraint_pairs)
	return str(constraints)


def record_course_content(semester, course_code, course_content):
	kwargs = {
		"course_title": course_content["title"],
		"au": float(course_content["au"]),
		"description": course_content["description"],
		"constraint": str(get_constraint_string(course_content)),
		"grade_type": GradeType.READABLE_TO_ID[course_content.get("grade_type", "Default")],
	}

	course = CourseTab.objects.filter(course_code=course_code).first()
	if course:
		semesters = eval(course.semesters)
		semesters.append(semester)
		semesters = sorted(list(set(semesters)))
		kwargs.update({"semesters": str(semesters)})
		CourseTab.objects.filter(course_code=course_code).update(**kwargs)
	else:
		kwargs.update({
			"semesters": str([semester]),
			"as_pe": False,
			"as_ue": False,
		})
		CourseTab.objects.create(course_code=course_code, **kwargs)


if __name__ == "__main__":
	if len(sys.argv) == 1:
		semester = crawl_course_content.get_latest_semester()
	elif len(sys.argv) == 2:
		semester = sys.argv[1]

	else:
		raise Exception("Invalid sys.argv length!")

	course_contents = crawl_course_content.crawl(semester=semester)
	print("Number of Courses Found: {}".format(len(course_contents.items())))

	for course_code, course_content in course_contents.items():
		record_course_content(semester, course_code, course_content)
	print("Courses Dumped into DB")
