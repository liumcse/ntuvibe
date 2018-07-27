from webapi.models import (
	CourseTab,
	UserTab,
	CourseRatingTab,
	ProfessorTab,
	ProfessorRatingTab,
	ClassScheduleTab
)


def get_schedule_by_id(id):
	return ClassScheduleTab.objects.filter(id=id).first()


def get_schedules(**kwargs):
	return ClassScheduleTab.objects.filter(**kwargs)


