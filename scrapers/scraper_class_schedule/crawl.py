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
    latest_semester = soup.find("select", attrs={"name": "acadsem"}).find_all("option")[0]["value"]

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


def parse_schedule_details(detail_html):
    soup = BeautifulSoup(detail_html, "html.parser")

    global all_schedule_details
    tables = soup.find_all("table")
    for i in range(0, len(tables), 2):
        course_general_table = tables[i]
        index_table = tables[i+1]

        course_code = course_general_table.find("td").text
        if all_schedule_details.get(course_code):
            continue

        indices = dict()  # index:str, slots:list
        for tr in index_table.find_all("tr")[1:]:
            index_field, slot = parse_row(tr)
            if index_field:
                current_index = index_field
                indices[current_index] = [slot]
            else:
                indices[current_index].append(slot)

        all_schedule_details[course_code] = indices


def parse_row(tr):
    texts = tr.text.split("\n")
    texts = [text.strip() for text in texts]
    index_field = texts[1]

    slot = {
        "type": texts[2],
        "group": texts[3],
        "day": texts[4],
        "time": texts[5],
        "venue": texts[6],
        "remark": texts[7]
    }
    return index_field, slot


def crawl():
    main_site_html = request_manager.get_class_schedule_main_html()
    latest_semester = parse_latest_semester(main_site_html)

    category_list_html = request_manager.get_class_schedule_category_list_html(latest_semester)
    category_list = parse_category_list(category_list_html)

    for category in category_list:
        print(category)
        detail_html = request_manager.get_class_schedule_detail_html(latest_semester, category)
        parse_schedule_details(detail_html)

        time.sleep(0.1)

    global all_schedule_details

    write_json_path = "data/class_schedule_%s.json"
    if not os.path.exists(os.path.dirname(write_json_path)):
        os.makedirs(os.path.dirname(write_json_path))
    write_json = open(write_json_path % get_timestamp(), "wb+")
    write_json.write(json.dumps(all_schedule_details, ensure_ascii=False, indent=2).encode('utf8'))
    return all_schedule_details


all_schedule_details = dict()  # course_code:str, indices:dict

if __name__ == "__main__":
    crawl()
