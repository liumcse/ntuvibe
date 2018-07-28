from webapi.models import (
	CourseTab,
	UserTab,
	CourseRatingTab,
	ProfessorTab,
	ProfessorRatingTab,
	ClassScheduleTab
)

def get_professor_by_profid(id):
	return ProfessorTab.objects.filter(id=id).first()


def get_professors_by_courseid(courseid):
	return ProfessorTab.objects.filter(courseid=courseid)


def add_professor(courseid, name, title, photo=None, description=None):
	prof = ProfessorTab(
		courseid=courseid,
		name=name,
		title=title,
		photo=photo if photo else "default",
		description=description if description else ""
	)
	prof.create()


