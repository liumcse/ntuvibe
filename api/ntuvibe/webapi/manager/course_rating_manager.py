from webapi.models import CourseRatingTab
from webapi.manager import user_manager
from webapi.utils import get_timestamp


def get_rating_record_by_id(rating_id):
	return CourseRatingTab.objects.filter(id=rating_id).first()


def get_rating_records_by_course_id(course_id):
	return CourseRatingTab.objects.filter(course_id=course_id)


def get_rating_scores_by_course_id(course_id):
	return CourseRatingTab.objects.filter(course_id=course_id).values("easy", "useful", "like")


def get_rating_records_by_user_id(user_id):
	return CourseRatingTab.objects.filter(user_id=user_id)


def get_rating_record_by_course_id_user_id(course_id, user_id):
	return CourseRatingTab.objects.filter(course_id=course_id).filter(user_id=user_id)


def add_rating_record(user_id, course_id, easy, useful, like, comment=None):
	rating = CourseRatingTab(
		user_id=user_id,
		course_id=course_id,
		easy=easy,
		useful=useful,
		like=like,
		comment=comment if comment else "",
		create_time=get_timestamp()
	)
	rating.save()


def delete_rating_record_by_id(id):
	rating = get_rating_record_by_id(id)
	rating.delete()


def prepare_total_rating_data(course_id):
	score_list = get_rating_scores_by_course_id(course_id)
	count = len(score_list)
	easy = useful = like = 0
	for score in score_list:
		easy += score["easy"]
		useful += score["useful"]
		like += score["like"]
	if count != 0:
		easy = int(easy/count)
		useful = int(useful/count)
		like = int(like/count)
	return {
		"easy": easy,
		"useful": useful,
		"like": like,
		"count": count
	}


def prepare_comments_data(rating_records):
	comment_list = []
	for rating in rating_records:
		if rating.comment:
			user = user_manager.get_user_by_user_id(rating.user_id)
			if not user:
				continue
			comment_dict = {
				"userid": user.pk,
				"username": user.username,
				"major": "",
				"easy": rating.easy,
				"useful": rating.useful,
				"like": rating.like,
				"comment_content": rating.comment,
				"comment_date": rating.create_time,
			}
			comment_list.append(comment_dict)
	return comment_list


