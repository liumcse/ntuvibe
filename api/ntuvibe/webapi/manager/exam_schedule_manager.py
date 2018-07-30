from webapi.models import ExamScheduleTab


def prepare_exam_schedule_dict(exam_schedule):
	return {
		"data": {
			"start_time": exam_schedule.start_time,
			"end_time": exam_schedule.end_time,
		}
	}


def get_exam_schedule_by_course_id(course_id):
	return ExamScheduleTab.objects.filter(course_id=course_id).first()