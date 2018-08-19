import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../")
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../api/ntuvibe")
sys.path.append("/home/ubuntu/.local/lib/python3.5/site-packages")
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ntuvibe.settings")
django.setup()

from webapi.models import *
from scrapers.constants import *
from scrapers.scraper_class_schedule import crawl_class_schedule
import datetime
import re


def get_course_id_by_course_code(course_code):
	try:
		return CourseTab.objects.filter(course_code=course_code).first().id
	except AttributeError:
		print("course_id not found for course_code: %s" % course_code)
		return None


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


def record_class_schedule(course_code, class_schedule):
	course_id = get_course_id_by_course_code(course_code)
	if not course_id:
		return

	# Clear original class schedules from db
	ClassScheduleTab.objects.filter(course_id=course_id).delete()

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
				course_id=course_id,
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
	CourseTab.objects.filter(id=course_id).update(as_pe=as_pe, as_ue=as_ue)


if __name__ == "__main__":
	class_schedules = crawl_class_schedule.crawl()
	for course_code, class_schedule in class_schedules.items():
		record_class_schedule(course_code, class_schedule)
