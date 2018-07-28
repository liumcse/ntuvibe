import os
import django
import sys

sys.path.append(os.path.dirname(__file__) + "/../../api/ntuvibe")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ntuvibe.settings")
django.setup()

from webapi.models import *
from scrapers.utils import get_timestamp
from scrapers.constants import *
from scrapers.scraper_course_content import crawl_course_content
from scrapers.scraper_class_schedule import crawl_class_schedule
from scrapers.scraper_exam_schedule import crawl_exam_schedule
import datetime
import re


def get_courseid_by_course_code(course_code):
	try:
		return CourseTab.objects.filter(course_code=course_code).first().id
	except AttributeError:
		print("courseid not found for course_code: %s" % course_code)
		return None


def get_constraint_string(course_content):
	constraint = dict([(key, course_content.get(key, None)) for key in CONSTRING_KEYS])
	return str(constraint)


def get_weeks_string_from_remark(remark):
	if not remark.strip():
		return str([i for i in range(1, 14)])
	if "Online Course" in remark:
		return str([ONLINE_COURSE_REMARK])
	if "Teaching Wk" not in remark:
		return str([])
	weeks = []
	for splitted in remark.split(","):
		result = re.sub("[\sA-Za-z]", "", splitted).split("-")
		if len(result) == 1:
			weeks.append(int(result[0]))
		elif len(result) == 2:
			for week in range(int(result[0]), int(result[1]) + 1):
				weeks.append(week)
		else:
			print("wrong remark format: %s", remark)
	return str(weeks)


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


def record_class_schedule(course_code, class_schedule):
	courseid = get_courseid_by_course_code(course_code)
	if not courseid:
		return

	# Clear original class schedules from db
	ClassScheduleTab.objects.filter(courseid=courseid).delete()

	# Record new class schedules to db
	new_indices = class_schedule["indices"]
	for index, slots in new_indices.items():
		for slot in slots:
			try:
				if not slot["time"].strip():
					start_time_str = "0000"
					end_time_str = "0000"
				else:
					start_time_str, end_time_str = slot["time"].split("-")

			except Exception:
				print("Wrong time format: %s, should be HHMM-HHMM" % slot["time"])

			start_time = datetime.time(hour=int(start_time_str[0:2]), minute=int(start_time_str[2:4]))
			end_time = datetime.time(hour=int(end_time_str[0:2]), minute=int(end_time_str[2:4]))

			ClassScheduleTab.objects.create(
				courseid=courseid,
				index=index,
				start_time=start_time,
				end_time=end_time,
				day=Days.VALUE_TO_NAME.get(slot["day"], "0"),
				type=slot["type"],
				venue=slot["venue"],
				group=slot["group"],
				weeks=get_weeks_string_from_remark(slot["remark"])
			)

	# Check availability as UE or PE
	last_characters = class_schedule["title"][-3:]
	as_ue = "*" in last_characters
	as_pe = "#" in last_characters
	CourseTab.objects.filter(id=courseid).update(as_pe=as_pe, as_ue=as_ue)


def record_exam_schedule(course_code, exam_schedule):
	courseid = get_courseid_by_course_code(course_code)
	if not courseid:
		return

	start_str = exam_schedule["date"] + " " + exam_schedule["time"]
	start_time = datetime.datetime.strptime(start_str, "%d %B %Y %I.%M %p").timestamp()
	end_time = start_time + int(60.0 * 60.0 * float(exam_schedule["duration"]))

	result = ExamScheduleTab.objects.filter(courseid=courseid).update(start_time=start_time, end_time=end_time)
	if not result:
		ExamScheduleTab.objects.create(courseid=courseid, start_time=start_time, end_time=end_time)


if __name__ == "__main__":
	course_contents = crawl_course_content.crawl()
	for course_code, course_content in course_contents.items():
		record_course_content(course_code, course_content)

	class_schedules = crawl_class_schedule.crawl()
	for course_code, class_schedule in class_schedules.items():
		record_class_schedule(course_code, class_schedule)

	exam_schedules = crawl_exam_schedule.crawl()
	for course_code, exam_schedule in exam_schedules.items():
		record_exam_schedule(course_code, exam_schedule)

	pass
