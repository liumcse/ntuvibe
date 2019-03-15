from webapi.models import CourseTab, ExamScheduleTab
from django.db.models import Q
from .exam_schedule_manager import get_exam_schedule_by_course_id
import urllib
import itertools
import re

THIS_SEMESTER = "2018_2"


def build_regex_from_keyword_list(keyword_list):
    """This function builds regex pattern from a list of keywords

    :param keyword_list: list of keywords
    :type keyword_list: List
    :return: regex
    :rtype: str
    """
    splitted_keywords = urllib.parse.unquote(keyword_list).split("+")
    permutated_keyword_list = list(
        itertools.permutations(splitted_keywords))
    regex_pre_build = list(
        map(lambda x: "(.*" + "+.*".join(x) + ".*)+", permutated_keyword_list))
    regex = re.compile("|".join(regex_pre_build)).pattern
    return regex


def get_courses_by_search(keywords=None, filter=None, sort=0):
    """
    Note on filters
    0: Available in this semester
    1: Pass / Fail
    2: Read as PE
    3: Read as UE
    4: No final exam
    """
    if keywords is None and filter is None:
        return []
    regex = build_regex_from_keyword_list(keywords)
    print(regex)
    output = CourseTab.objects.filter(Q(course_code__iregex=regex)
                                      | Q(course_title__iregex=regex) | Q(description__iregex=regex))
    # apply filters
    if filter is not None:
        filter = filter.split(" ")
        for x in filter:
            if x == "0":
                output = output.filter(semesters__icontains=THIS_SEMESTER)
            if x == "1":
                output = output.filter(grade_type__exact="1")
            if x == "2":
                output = output.filter(as_pe__exact="1")
            if x == "3":
                output = output.filter(as_ue__exact="1")
            if x == "4":
                # todo
                pass

    return output


def prepare_search_result(courses):
    return [{"code": course.course_code,
             "title": course.course_title,
             "description": course.description,
             "as_ue": course.as_ue,
             "as_pe": course.as_pe,
             "grade_type": course.grade_type} for course in courses]
