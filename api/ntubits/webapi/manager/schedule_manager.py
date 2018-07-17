from api.ntubits.webapi.models import (
	CourseTab,
	UserTab,
	CourseRatingTab,
	ProfessorTab,
	ProfessorRatingTab,
	ScheduleTab
)


def get_schedule_by_id(id):
	return ScheduleTab.objects.filter(id=id).first()


def get_schedules(**kwargs):
	return ScheduleTab.objects.filter(**kwargs)


