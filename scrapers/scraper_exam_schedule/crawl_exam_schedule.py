import re
from bs4 import BeautifulSoup
from scrapers.constants import EXAM_SCHEDULE_USEFUL_SEMESTER_VALUE
from scrapers import request_manager
from scrapers.utils import write_json_file, get_date_time


def parse_latest_semester(main_site_html):

	soup = BeautifulSoup(main_site_html, "html.parser")
	latest_semester_input = soup.find("input", attrs={"name": "p_plan_no", "value": EXAM_SCHEDULE_USEFUL_SEMESTER_VALUE})
	latest_semester_text = latest_semester_input.next_sibling  # "\nAY2018-19 SEM 1\n"

	match = re.match("AY(\d{4})-\d{2} SEM (\d{1})", latest_semester_text.strip())
	if match:
		latest_academic_year = match.group(1)
		latest_semester = match.group(2)
	else:
		raise Exception

	return latest_academic_year, latest_semester


def parse_exam_details(detail_html):

	soup = BeautifulSoup(detail_html, "html.parser")

	exam_detail_table = soup.find("div", attrs={"id": "ui_body_container"}).find_all("table")[1]
	exam_detail_rows = exam_detail_table.find("tr").find_all("tr")[1:-1]

	global all_exam_details
	for tr in exam_detail_rows:
		course_code, exam_detail = parse_row(tr)
		if not all_exam_details.get(course_code):
			all_exam_details[course_code] = exam_detail
		else:
			raise Exception


def parse_row(tr):
	texts = tr.text.split("\n")
	stripped_texts = []
	for text in texts:
		if text.strip():
			stripped_texts.append(text.strip())

	course_code = stripped_texts[3]
	exam_detail = {
		"date": stripped_texts[0],
		"day": stripped_texts[1],
		"time": stripped_texts[2],
		"course_title": stripped_texts[4],
		"duration": stripped_texts[5]
	}
	return course_code, exam_detail


def crawl():
	print(get_date_time())
	main_site_html = request_manager.get_exam_schedule_main_html()
	latest_academic_year, latest_semester = parse_latest_semester(main_site_html)

	detail_html = request_manager.get_exam_schedule_detail_html(latest_academic_year, latest_semester)
	parse_exam_details(detail_html)

	global all_exam_details
	# write_json_file(json_path_current="data/exam_schedule.json", json_dict=all_exam_details)
	return all_exam_details


all_exam_details = {}

if __name__ == "__main__":
	crawl()
