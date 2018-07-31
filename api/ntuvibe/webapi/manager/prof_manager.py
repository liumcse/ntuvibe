from webapi.models import ProfessorTab
from webapi.manager import prof_rating_manager


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


def get_prof_rating(profid):
	prof_ratings = prof_rating_manager.get_prof_rating_by_prof_id(profid)
	count = helpful = clarity = enthusiasm = 0
	comment = []
	for rating in prof_ratings:
		count += 1
		helpful += rating.helpful
		clarity += rating.clarity
		enthusiasm += rating.enthusiasm
		if rating.comment:
			comment.append({
				'userid': rating.userid,
				'content': rating.comment,
			})

	if count < 5:
		return {
			'count': count,
			'helpful': 0,
			'clarity': 0,
			'enthusiasmn': 0,
			'comment': comment,
		}

	else:
		return {
			'count': count,
			'helpful': helpful,
			'clarity': clarity,
			'enthusiasm': enthusiasm,
			'comment': comment,
		}