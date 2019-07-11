import re
from bs4 import BeautifulSoup
import request_manager
from utils import write_json_file, get_date_time
from constants import VALID_COURSE_NUMBER_LOWER_BOUND


def parse_latest_semester(main_site_html):

    soup = BeautifulSoup(main_site_html, "html.parser")
    latest_semester_input = soup.find("input", attrs={"name": "p_plan_no"})
    # "\nAY2018-19 SEM 1\n"
    candidate_semesters_text = latest_semester_input.parent.get_text()
    semester_pattern = "\nAY(\d{4})-\d{2} SEM (\d{1})\n"
    candidate_semesters = re.findall(
        semester_pattern, candidate_semesters_text)
    # e.g. candidate_semesters = [('2018', '1')]
    # e.g. candidate_semesters = [('2018', '1'), ('2018', '2')]
    if candidate_semesters:
        latest_academic_year, latest_semester = max(
            candidate_semesters, key=lambda x: x[0]+x[1])
    else:
        raise Exception

    return latest_academic_year, latest_semester


def parse_exam_details(detail_html):

    soup = BeautifulSoup(detail_html, "html.parser")

    for exam_detail_table in soup.find("div", attrs={"id": "ui_body_container"}).find_all("table"):
        if len(exam_detail_table.find_all("tr")) >= VALID_COURSE_NUMBER_LOWER_BOUND:
            print("Large number of records found successfully!")
            exam_detail_rows = exam_detail_table.find_all("tr")[1:-1]

            global all_exam_details
            for tr in exam_detail_rows:
                course_code, exam_detail = parse_row(tr)
                if not all_exam_details.get(course_code):
                    all_exam_details[course_code] = exam_detail
                else:
                    raise Exception
            break


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
    latest_academic_year, latest_semester = parse_latest_semester(
        main_site_html)
    print(latest_academic_year + ";" + latest_semester)

    detail_html = request_manager.get_exam_schedule_detail_html(
        latest_academic_year, latest_semester)
    parse_exam_details(detail_html)

    global all_exam_details
    # write_json_file(json_path_current="data/exam_schedule.json", json_dict=all_exam_details)
    return all_exam_details


all_exam_details = {}

if __name__ == "__main__":
    crawl()
