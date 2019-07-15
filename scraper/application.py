import traceback
from flask import Flask, jsonify, make_response
from crawl_course_content import crawl as crawl_course_content
from crawl_course_content_graduate import crawl as crawl_course_content_graduate
from crawl_class_schedule import crawl as crawl_class_schedule
from crawl_exam_schedule import crawl as crawl_exam_schedule

app = Flask(__name__)


@app.route('/')
def help():
    return "Hi!"  # TODO(liumcse): Display help.


@app.route('/course_content')
def course_content():
    try:
        data = crawl_course_content()
        return jsonify(data)
    except Exception as e:
        response = make_response(traceback.format_exc(), 400)
        return response


@app.route('/course_content_graduate')
def course_content_graduate():
    try:
        data = crawl_course_content_graduate()
        return jsonify(data)
    except Exception as e:
        response = make_response(traceback.format_exc(), 400)
        return response


@app.route('/class_schedule')
def class_schedule():
    try:
        data = crawl_class_schedule()
        return jsonify(data)
    except Exception as e:
        response = make_response(traceback.format_exc(), 400)
        return response


@app.route('/exam_schedule')
def exam_schedule():
    try:
        data = crawl_exam_schedule()
        return jsonify(data)
    except Exception as e:
        response = make_response(traceback.format_exc(), 400)
        return response


if __name__ == "__main__":
    app.run()
