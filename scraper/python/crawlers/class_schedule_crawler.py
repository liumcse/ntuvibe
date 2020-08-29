from bs4 import BeautifulSoup
from utils.request_manager import RequestManager
from utils.utils import get_latest_semester


class ClassScheduleCrawler:
    def __init__(self):
        self.schedule_details = {}

    def __parse_category_list(self, semester_html: str):
        category_list = []

        soup = BeautifulSoup(semester_html, "html.parser")
        options = soup.find(
            "select", attrs={"name": "r_course_yr"}).find_all("option")

        for option in options:
            if option["value"]:
                category_list.append(option["value"])

        return category_list

    def __parse_schedule_details(self, detail_html: str):
        soup = BeautifulSoup(detail_html, "html.parser")
        tables = soup.find_all("table")
        for i in range(0, len(tables), 2):
            course_general_table = tables[i]
            index_table = tables[i + 1]

            course_code = course_general_table.find("td").text
            course_title = course_general_table.find(
                "td").find_next_sibling("td").text
            if self.schedule_details.get(course_code):
                continue

            indices = dict()  # index:str, slots:list
            for tr in index_table.find_all("tr")[1:]:
                index_field, slot = self.__parse_row(tr)
                if index_field:
                    current_index = index_field
                    indices[current_index] = [slot]
                else:
                    indices[current_index].append(slot)

            self.schedule_details[course_code] = {
                "title": course_title,
                "indices": indices
            }

    def __parse_row(self, tr):
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

    def crawl(self, semester=None) -> {str, dict}:
        """Crawls class schedule"""
        if not semester:
            semester = get_latest_semester()
        html = RequestManager.get_class_schedule_detail_html(semester)
        self.__parse_schedule_details(html)
        return {
            'semester': semester,
            'data': self.schedule_details,
        }
