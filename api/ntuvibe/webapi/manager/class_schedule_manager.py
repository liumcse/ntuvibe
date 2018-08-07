from webapi.models import ClassScheduleTab


def get_class_schedule_by_id(id):
	return ClassScheduleTab.objects.filter(id=id).first()


def get_class_schedules(**kwargs):
	return ClassScheduleTab.objects.filter(**kwargs)


def prepare_class_schedule_data(class_schedules):
	index_to_slots = dict()
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

	return index_to_slots
