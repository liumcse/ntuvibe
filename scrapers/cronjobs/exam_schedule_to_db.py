import os
import django
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../")
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../api/ntuvibe")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ntuvibe.settings")
django.setup()

from webapi.models import *
from scrapers.scraper_exam_schedule import crawl_exam_schedule
import datetime


def get_courseid_by_course_code(course_code):
	try:
		return CourseTab.objects.filter(course_code=course_code).first().id
	except AttributeError:
		print("courseid not found for course_code: %s" % course_code)
		return None


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
	exam_schedules = crawl_exam_schedule.crawl()
	for course_code, exam_schedule in exam_schedules.items():
		record_exam_schedule(course_code, exam_schedule)
