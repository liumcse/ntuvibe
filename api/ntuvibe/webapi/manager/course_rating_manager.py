from api.ntuvibe.webapi.models import (
	CourseTab,
	UserTab,
	CourseRatingTab,
	ProfessorTab,
	ProfessorRatingTab,
	ScheduleTab
)

def get_rating_by_id(ratingid):
	return CourseRatingTab.objects.filter(id=ratingid).first()


def get_ratings_by_courseid(courseid):
	return CourseRatingTab.objects.filter(courseid=courseid)


def get_ratings_by_userid(userid):
	return CourseRatingTab.objects.filter(userid=userid)


def add_rating(userid, courseid, easy, useful, like, comment=None):
	rating = CourseRatingTab(
		userid=userid,
		courseid=courseid,
		easy=easy,
		useful=useful,
		like=like,
		comment=comment if comment else ""
	)
	rating.create()

def delete_rating(id):
	rating = get_rating_by_id(id)
	rating.delete()