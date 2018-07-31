from webapi.models import (
	CourseTab,
	UserTab,
	CourseRatingTab,
	ProfessorTab,
	ProfessorRatingTab,
	ClassScheduleTab
)


def get_prof_rating_by_id(id):
	return ProfessorRatingTab.objects.filter(id=id).first()


def get_prof_rating_by_prof_id(prof_id):
	return ProfessorRatingTab.objects.filter(prof_id=prof_id)


def get_prof_rating_by_user_id(user_id):
	return ProfessorRatingTab.objects.filter(user_id=user_id)


def add_prof_rating(user_id, prof_id, clarity, enthusiasm, helpful, comment=None):
	rating = ProfessorRatingTab(
		user_id=user_id,
		prof_id=prof_id,
		clarity=clarity,
		enthusiasm=enthusiasm,
		helpful=helpful,
		comment=comment if comment else ""
	)
	rating.create()


def delete_prof_rating(id):
	rating = get_prof_rating_by_id(id)
	rating.delete()
