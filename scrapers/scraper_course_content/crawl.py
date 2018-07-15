import os
import json
import time
from bs4 import BeautifulSoup
from collections import deque
from scrapers import request_manager
from scrapers.constants import COURSE_CONTENT_DETAIL_TYPE
from scrapers.utils import get_timestamp


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

    print(category_list)
    return category_list


def parse_course_details(detail_html):
    soup = BeautifulSoup(detail_html, "html.parser")

    global all_course_details
    for table in soup.find_all("table"):  # each table contains info of a course
        course_detail = dict()

        # extract prerequisite info (in pink color)
        course_detail["prerequisite"] = []
        pink_fonts = table.find_all("font", attrs={"color": "#FF00FF"})
        for font in pink_fonts:
            if font.text and font.text != COURSE_CONTENT_DETAIL_TYPE.prerequisite:
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
            detail_type = COURSE_CONTENT_DETAIL_TYPE.VALUE_TO_NAME[detail_type]
            detail_info = texts.popleft()
            course_detail[detail_type] = detail_info

        if texts:
            course_detail["description"] = texts.popleft()

        all_course_details[course_code] = course_detail


def crawl():
    main_site_html = request_manager.get_course_content_main_html()
    latest_semester = parse_latest_semester(main_site_html)

    category_list_html = request_manager.get_course_content_category_list_html(latest_semester)
    category_list = parse_category_list(category_list_html)

    for category in category_list:
        print(category)
        detail_html = request_manager.get_course_content_detail_html(latest_semester, category)
        parse_course_details(detail_html)

        time.sleep(0.1)

    global all_course_details

    write_json_path = "data/course_content_%s.json"
    if not os.path.exists(os.path.dirname(write_json_path)):
        os.makedirs(os.path.dirname(write_json_path))
    write_json = open(write_json_path % get_timestamp(), "wb")
    write_json.write(json.dumps(all_course_details, ensure_ascii=False, indent=2).encode('utf8'))
    return all_course_details


all_course_details = dict()  # course_code:str, course_detail:dict

if __name__ == "__main__":
    crawl()
