import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../")
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/../../api/ntuvibe")
sys.path.append("/home/ubuntu/.local/lib/python3.5/site-packages")
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ntuvibe.settings")
django.setup()

from webapi.models import *
from scrapers.scraper_exam_schedule import crawl_exam_schedule
import datetime


def get_course_id_by_course_code(course_code):
	try:
		return CourseTab.objects.filter(course_code=course_code).first().id
	except AttributeError:
		print("course_id not found for course_code: %s" % course_code)
		return None


def record_exam_schedule(course_code, exam_schedule):
	course_id = get_course_id_by_course_code(course_code)
	if not course_id:
		return

	start_str = exam_schedule["date"] + " " + exam_schedule["time"]
	start_time = datetime.datetime.strptime(start_str, "%d %B %Y %I.%M %p").timestamp()
	end_time = start_time + int(60.0 * 60.0 * float(exam_schedule["duration"]))

	result = ExamScheduleTab.objects.filter(course_id=course_id).update(start_time=start_time, end_time=end_time)
	if not result:
		ExamScheduleTab.objects.create(course_id=course_id, start_time=start_time, end_time=end_time)


if __name__ == "__main__":
	exam_schedules = crawl_exam_schedule.crawl()
	for course_code, exam_schedule in exam_schedules.items():
		record_exam_schedule(course_code, exam_schedule)
