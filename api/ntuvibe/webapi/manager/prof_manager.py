from webapi.models import ProfessorTab


def get_professor_by_prof_id(id):
	return ProfessorTab.objects.filter(id=id).first()


def get_professors_by_course_id(course_id):
	return ProfessorTab.objects.filter(course_id=course_id)


def add_professor(course_id, name, title, photo=None, description=None):
	prof = ProfessorTab(
		course_id=course_id,
		name=name,
		title=title,
		photo=photo if photo else "default",
		description=description if description else ""
	)
	prof.create()
