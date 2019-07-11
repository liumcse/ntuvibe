from flask import Flask
from crawl_course_content import crawl as crawl_course_content
from crawl_course_content_graduate import crawl as crawl_course_content_graduate
from crawl_class_schedule import crawl as crawl_class_schedule
from crawl_exam_schedule import crawl as crawl_exam_schedule


app = Flask(__name__)

print(crawl_course_content())
