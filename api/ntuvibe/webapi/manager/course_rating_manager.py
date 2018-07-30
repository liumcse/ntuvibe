from webapi.models import CourseRatingTab


def get_rating_by_id(rating_id):
	return CourseRatingTab.objects.filter(id=rating_id).first()


def get_ratings_by_course_id(course_id):
	return CourseRatingTab.objects.filter(course_id=course_id)


def get_ratings_by_user_id(user_id):
	return CourseRatingTab.objects.filter(user_id=user_id)


def add_rating(user_id, course_id, easy, useful, like, comment=None):
	rating = CourseRatingTab(
		user_id=user_id,
		course_id=course_id,
		easy=easy,
		useful=useful,
		like=like,
		comment=comment if comment else ""
	)
	rating.create()


def delete_rating_by_id(id):
	rating = get_rating_by_id(id)
	rating.delete()


def calculate_ratings_by_course_id(course_id):
	ratings = get_ratings_by_course_id(course_id)
	result = {}
	useful = helpful = easy = count = 0
	for r in ratings:
		useful += r.useful
		helpful += r.helpful
		easy += r.easy
		count += 1
	try:
		result['useful'] = useful / count
		result['helpful'] = helpful / count
		result['easy'] = easy / count
	except ZeroDivisionError:
		result = None
	return result





