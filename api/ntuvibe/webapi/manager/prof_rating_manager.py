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


def get_prof_rating_by_profid(profid):
	return ProfessorRatingTab.objects.filter(profid=profid)


def get_prof_rating_by_userid(userid):
	return ProfessorRatingTab.objects.filter(userid=userid)


def add_prof_rating(userid, profid, clarity, enthusiasm, helpful, comment=None):
	rating = ProfessorRatingTab(
		userid=userid,
		profid=profid,
		clarity=clarity,
		enthusiasm=enthusiasm,
		helpful=helpful,
		comment=comment if comment else ""
	)
	rating.create()


def delete_prof_rating(id):
	rating = get_prof_rating_by_id(id)
	rating.delete()
