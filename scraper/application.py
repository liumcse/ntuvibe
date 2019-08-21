import traceback
import firebase_admin
from firebase_admin import firestore
from flask import Flask, make_response
import process_course_content
import process_class_schedule
import process_exam_schedule
import process_additional_info

firebase_admin.initialize_app()
db = firestore.client()

app = Flask(__name__)


@app.route('/')
def help():
    return """
    <pre><code>
    Hello! The following endpoints are available:
        /crawl_course:              crawl course information and save to database.
        /crawl_class_schedule:      crawl class schedule and save to database. This operation will delete all existing schedule.
        /crawl_exam_schedule:       crawl exam schedule and save to database. This operation will delete all existing exam schedule.
        /crawl_additional_info:     crawl additional information for each course.
    """


@app.route('/crawl_course')
def crawl_course():
    try:
        semester = process_course_content.get_latest_semester()
        crawl_result = process_course_content.crawl(semester)
        for course_code, course_content in crawl_result.items():
            process_course_content.save(
                db, semester, course_code, course_content)
        return make_response('ok', 200)
    except Exception as e:
        return make_response(traceback.format_exc(), 400)


@app.route('/crawl_class_schedule')
def crawl_class_schedule():
    try:
        crawl_result = process_class_schedule.crawl()
        if not crawl_result:
            raise Exception
        process_class_schedule.delete_all_schedules_in_db(db)
        for course_code, class_schedule in crawl_result.items():
            process_class_schedule.save(
                db, course_code, class_schedule)
        return make_response('ok', 200)
    except Exception as e:
        return make_response(traceback.format_exc(), 400)


@app.route('/crawl_exam_schedule')
def crawl_exam_schedule():
    try:
        crawl_result = process_exam_schedule.crawl()
        if not crawl_result:
            raise Exception
        process_exam_schedule.delete_all_schedules_in_db(db)
        for course_code, exam_schedule in crawl_result.items():
            process_exam_schedule.save(
                db, course_code, exam_schedule)
        return make_response('ok', 200)
    except Exception as e:
        return make_response(traceback.format_exc(), 400)


@app.route('/crawl_additional_info')
def crawl_additional_info():
    try:
        crawl_result = process_class_schedule.crawl()
        for course_code, exam_schedule in crawl_result.items():
            process_additional_info.save(
                db, course_code, exam_schedule)
        return make_response('ok', 200)
    except Exception as e:
        return make_response(traceback.format_exc(), 400)


if __name__ == "__main__":
    app.run()
