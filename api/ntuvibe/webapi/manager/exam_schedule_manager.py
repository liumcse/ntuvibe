from webapi.models import ExamScheduleTab


def prepare_exam_schedule_data(exam_schedule):
	return {
		"start_time": exam_schedule.start_time,
		"end_time": exam_schedule.end_time,
		"update_time": exam_schedule.update_time,
	}


def get_exam_schedule_by_course_id(course_id):
	return ExamScheduleTab.objects.filter(course_id=course_id).first()