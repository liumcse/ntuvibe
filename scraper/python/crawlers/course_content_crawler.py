from bs4 import BeautifulSoup
from utils.constants import CourseContentDetailType
from utils.utils import get_latest_semester
from utils.request_manager import RequestManager
from collections import deque


class CourseContentCrawler:
    """
    Crawler for course content.
    """

    def __init__(self):
        self.course_details = {}

    def __get_tables_in_special_case(self, soup: BeautifulSoup):
        tables = []
        # Bind current_table to list
        current_table = BeautifulSoup('', "html.parser")
        for tr in soup.find_all("tr")[1:]:
            tds = tr.find_all("td")
            if len(tds) == 4:
                tables.append(current_table)
                tds[-1].extract()
                tr.wrap(soup.new_tag("table"))
                current_table = tr.parent
            current_table.append(tr)
        tables.append(current_table)
        for table in tables:
            if len(table.find_all("tr")) > 0:
                table.find_all("tr")[-1].extract()
        return tables

    def __parse_course_details(self, html: str):
        soup = BeautifulSoup(html, "html.parser")

        tables = soup.find_all("table")
        if len(tables) == 1 and soup.find_all(text="PROGRAMME/(DEPT MAINTAIN*)"):
            tables = self.__get_tables_in_special_case(soup=soup)

        # global all_course_details
        for table in tables:  # each table contains info of a course
            course_detail = {}

            # extract prerequisite info (in pink color)
            course_detail["prerequisite"] = []
            pink_fonts = table.find_all("font", attrs={"color": "#FF00FF"})
            for font in pink_fonts:
                if font.text and font.text != CourseContentDetailType.prerequisite:
                    course_detail["prerequisite"].append(font.text)
                font.extract()

            # put remaining text into a deque
            texts = deque([td.text for td in table.find_all("td")])

            if len(texts) == 0:
                continue

            course_code = texts.popleft()
            if self.course_details.get(course_code):
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

            self.course_details[course_code] = course_detail

    def crawl(self, semester=None) -> {str, dict}:
        """Crawls course content."""
        if not semester:
            semester = get_latest_semester()
        html = RequestManager.get_course_content_detail_html(semester)
        self.__parse_course_details(html)
        return {
            'semester': semester,
            'data': self.course_details,
        }
