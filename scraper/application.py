import traceback
import firebase_admin
from firebase_admin import firestore
from flask import Flask, jsonify, make_response
from crawl_course_content import crawl as crawl_course_content
from crawl_course_content_graduate import crawl as crawl_course_content_graduate
from crawl_class_schedule import crawl as crawl_class_schedule
from crawl_exam_schedule import crawl as crawl_exam_schedule
import process_course_content
import process_class_schedule
import process_exam_schedule

firebase_admin.initialize_app()
db = firestore.client()

app = Flask(__name__)


@app.route('/')
def help():
    return "Hi!"  # TODO(liumcse): Display help.


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
        for course_code, exam_schedule in crawl_result.items():
            process_exam_schedule.save(
                db, course_code, exam_schedule)
        return make_response('ok', 200)
    except Exception as e:
        return make_response(traceback.format_exc(), 400)


# @app.route('/course_content_graduate')
# def course_content_graduate():
#     try:
#         data = crawl_course_content_graduate()
#         return jsonify(data)
#     except Exception as e:
#         response = make_response(traceback.format_exc(), 400)
#         return response


# @app.route('/class_schedule')
# def class_schedule():
#     try:
#         data = crawl_class_schedule()
#         return jsonify(data)
#     except Exception as e:
#         response = make_response(traceback.format_exc(), 400)
#         return response


# @app.route('/exam_schedule')
# def exam_schedule():
#     try:
#         data = crawl_exam_schedule()
#         return jsonify(data)
#     except Exception as e:
#         response = make_response(traceback.format_exc(), 400)
#         return response


if __name__ == "__main__":
    app.run()
