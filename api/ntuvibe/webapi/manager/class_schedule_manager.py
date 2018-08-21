from webapi.models import ClassScheduleTab
from webapi.manager import cache_manager
from webapi.utils import get_hour_from_timestamp
from scrapers.scraper_course_vacancy import crawl_course_vacancy


def get_class_schedule_by_id(id):
	return ClassScheduleTab.objects.filter(id=id).first()


def get_class_schedules(**kwargs):
	return ClassScheduleTab.objects.filter(**kwargs)


def prepare_class_schedule_data(class_schedules):
	index_to_slots = dict()
	max_update_time = 0
	for class_schedule in class_schedules:
		index = class_schedule.index
		start_time = class_schedule.start_time
		end_time = class_schedule.end_time

		index_to_slots[index] = index_to_slots.get(index, [])
		index_to_slots[index].append({
			"type": class_schedule.type,
			"group": class_schedule.group,
			"day": class_schedule.day,
			"start_time": "{:02d}:{:02d}".format(start_time.hour, start_time.minute),
			"end_time": "{:02d}:{:02d}".format(end_time.hour, end_time.minute),
			"venue": class_schedule.venue,
			"weeks": eval(class_schedule.weeks)
		})
		max_update_time = max(max_update_time, class_schedule.update_time)

	index_to_slots.update({"update_time": max_update_time})
	return index_to_slots


def prepare_course_vacancy_data(course_code):
	current_hour = get_hour_from_timestamp()
	if current_hour in range(9, 22+1):
		return crawl_course_vacancy.get_course_vacancy_by_request(course_code)
	else:
		return cache_manager.get_course_vacancy_by_course_code(course_code)
