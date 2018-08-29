import time
from bs4 import BeautifulSoup
from collections import deque
from scrapers import request_manager
from scrapers.constants import CourseContentDetailType
from scrapers.utils import write_json_file, get_date_time


def parse_latest_semester(main_site_html):

	soup = BeautifulSoup(main_site_html, "html.parser")
	latest_semester = soup.find("select", attrs={"name": "acadsem"}).find_all("option")[-1]["value"]

	print(latest_semester)
	return latest_semester


def parse_category_list(semester_html):
	category_list = []

	soup = BeautifulSoup(semester_html, "html.parser")
	options = soup.find("select", attrs={"name": "r_course_yr"}).find_all("option")

	for option in options:
		if option["value"]:
			category_list.append(option["value"])

	return category_list


def get_tables_in_special_case(soup):
	tables = []
	for tr in soup.find_all("tr")[1:]:
		tds = tr.find_all("td")
		if len(tds) == 4:
			tds[-1].extract()
			tr.wrap(soup.new_tag("table"))
			current_table = tr.parent
			tables.append(current_table)
		else:
			current_table.append(tr)
	for table in tables:
		table.find_all("tr")[-1].extract()
	return tables


def parse_course_details(detail_html):
	soup = BeautifulSoup(detail_html, "html.parser")

	tables = soup.find_all("table")
	if len(tables) == 1 and soup.find_all(text="PROGRAMME/(DEPT MAINTAIN*)"):
		tables = get_tables_in_special_case(soup=soup)

	global all_course_details
	for table in tables:  # each table contains info of a course
		course_detail = dict()

		# extract prerequisite info (in pink color)
		course_detail["prerequisite"] = []
		pink_fonts = table.find_all("font", attrs={"color": "#FF00FF"})
		for font in pink_fonts:
			if font.text and font.text != CourseContentDetailType.prerequisite:
				course_detail["prerequisite"].append(font.text)
			font.extract()

		# put remaining text into a deque
		texts = deque([td.text for td in table.find_all("td")])
		course_code = texts.popleft()
		if all_course_details.get(course_code):
			continue

		course_detail["title"] = texts.popleft()
		course_detail["au"] = texts.popleft().strip().split()[0]

		while len(texts) >= 2:
			detail_type = texts.popleft()
			if not detail_type:
				continue
			detail_type = CourseContentDetailType.VALUE_TO_NAME[detail_type]
			detail_info = texts.popleft()
			course_detail[detail_type] = detail_info

		if texts:
			course_detail["description"] = texts.popleft()

		all_course_details[course_code] = course_detail


def get_latest_semester():
	main_site_html = request_manager.get_course_content_main_html()
	latest_semester = parse_latest_semester(main_site_html)
	return latest_semester


def crawl(semester=None):
	print(get_date_time())
	if not semester:
		semester = get_latest_semester()

	detail_html = request_manager.get_course_content_detail_html(semester)
	parse_course_details(detail_html)

	global all_course_details
	# write_json_file(json_path_current="data/course_content.json", json_dict=all_course_details)
	return all_course_details


all_course_details = dict()  # course_code:str, course_detail:dict

if __name__ == "__main__":
	crawl()
