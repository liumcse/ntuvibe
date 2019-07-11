from bs4 import BeautifulSoup
import request_manager
from utils import get_date_time


def parse_semester_list(main_site_html):
    semester_list = []

    soup = BeautifulSoup(main_site_html, "html.parser")
    options = soup.find("select", attrs={"name": "s_acad"}).find_all("option")

    for option in options:
        if option["value"]:
            semester_list.append(option["value"])

    return semester_list


def parse_category_list(semester_html):
    category_list = []

    soup = BeautifulSoup(semester_html, "html.parser")
    options = soup.find(
        "select", attrs={"name": "s_course"}).find_all("option")

    for option in options:
        if option["value"]:
            category_list.append(option["value"])

    return category_list


def parse_course_details(detail_html):
    soup = BeautifulSoup(detail_html, "html.parser")

    blue_fonts = soup.find_all("font", attrs={"size": "2", "color": "#0000FF"})
    description_fonts = soup.find_all(
        "font", attrs={"size": "2", "color": None})
    assert len(blue_fonts) == 3 * \
        len(description_fonts), "Parsing Error! Number of Course Codes/Title/AU/Description does not match!"

    course_code_list = [font.text.strip() for font in blue_fonts[0::3]]
    title_list = [font.text.strip() for font in blue_fonts[1::3]]
    au_list = [font.text.strip() for font in blue_fonts[2::3]]
    au_list = [au.split()[0] if len(au.split()) >=
               2 else "0.0" for au in au_list]
    description_list = [font.text.strip() for font in description_fonts]

    global all_course_details
    # each table contains info of a course
    for idx, description in enumerate(description_list):
        course_detail = {
            "title": title_list[idx],
            "au": au_list[idx],
            "description": description,
        }

        course_code = course_code_list[idx]
        all_course_details[course_code] = course_detail

    # handle "pass/fail" courses
    for font in soup.find_all("font", attrs={"size": "2", "color": "#990000"}, text="Pass/Fail Grade"):
        tr = font.find_previous("tr").find_previous("tr")
        # e.g. of tr:
        # <tr>
        #   <td width="10%"><b><font color="#0000FF" size="2">B6095</font></b></td>
        #   <td width="80%"><b><font color="#0000FF" size="2">TITLE</font></b></td>
        #   <td width="10%"><b><font color="#0000FF" size="2">  3.0 AU </font></b></td>
        # </tr>

        course_code_font = tr.find_all(
            "font", attrs={"size": "2", "color": "#0000FF"})[0]
        course_code = course_code_font.text
        all_course_details[course_code].update({"grade_type": "Pass/Fail"})


def get_latest_semester():
    main_site_html = request_manager.get_course_content_graduate_main_html()
    latest_semester = None
    for semester in parse_semester_list(main_site_html):
        semester_site_html = request_manager.get_course_content_graduate_semester_html(
            semester=semester)
        category_list = parse_category_list(semester_site_html)
        if len(category_list) > 3 and (latest_semester is None or semester > latest_semester):
            latest_semester = semester

    print("Get Latest Semester: {}".format(latest_semester))
    return latest_semester


def crawl(semester=None):
    print(get_date_time())
    if not semester:
        semester = get_latest_semester()

    semester_site_html = request_manager.get_course_content_graduate_semester_html(
        semester=semester)
    category_list = parse_category_list(semester_site_html)

    for category in category_list:
        detail_html = request_manager.get_course_content_graduate_detail_html(
            semester=semester, category=category)
        parse_course_details(detail_html)

    global all_course_details
    return all_course_details


all_course_details = dict()  # course_code:str, course_detail:dict

if __name__ == "__main__":
    crawl()
