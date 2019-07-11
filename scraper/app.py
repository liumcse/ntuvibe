from flask import Flask, jsonify
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
    return jsonify(crawl_course_content())


@app.route('/course_content_graduate')
def course_content_graduate():
    return jsonify(crawl_course_content_graduate())


@app.route('/class_schedule')
def class_schedule():
    return jsonify(crawl_class_schedule())


@app.route('/exam_schedule')
def exam_schedule():
    return jsonify(crawl_exam_schedule())
