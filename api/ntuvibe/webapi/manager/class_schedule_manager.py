from bs4 import BeautifulSoup

from webapi.models import ClassScheduleTab
from webapi.constants import NULL_TD_VALUE, INDEX_VACANCIES_INDEX, INDEX_VACANCIES_VACANCIES, INDEX_VACANCIES_WAITLIST
from webapi.manager import request_manager


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


def prepare_course_vacancies_data(course_code):
	return get_course_vacancies(course_code)


def _is_index_row(first_3_cells_of_row):
	cells_not_empty = map(lambda td: td.text != NULL_TD_VALUE, first_3_cells_of_row)
	return all(cells_not_empty)


def get_course_vacancies(course_code):
	res = request_manager.get_vacancies(course_code)
	soup = BeautifulSoup(res, "html.parser")
	all_rows_except_header = soup.findAll("tr")[1:]
	first_3_cells_of_all_rows = map(lambda x: x.findAll("td")[:3], all_rows_except_header)
	first_3_cells_of_index_rows = filter(_is_index_row, first_3_cells_of_all_rows)
	first_3_texts_of_index_rows = map(lambda x: list(map(lambda y: y.text.strip(), x)), first_3_cells_of_index_rows)
	vacancies_dict = {
		row[INDEX_VACANCIES_INDEX]: {
			"vacancies": row[INDEX_VACANCIES_VACANCIES],
			"waitlist": row[INDEX_VACANCIES_WAITLIST]
		}
		for row in first_3_texts_of_index_rows
	}
	return vacancies_dict
