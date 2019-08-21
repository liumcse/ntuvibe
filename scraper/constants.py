COURSE_CONTENT_MAIN_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/aus_subj_cont.main"
COURSE_CONTENT_DETAIL_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SUBJ_CONT.main_display1"

COURSE_CONTENT_GRADUATE_MAIN_URL = "https://wis.ntu.edu.sg/pls/webexe88/pgr$query_subject_content.display"
COURSE_CONTENT_GRADUATE_SEMESTER_URL = "https://wis.ntu.edu.sg/pls/webexe88/pgr$query_subject_content.display"
COURSE_CONTENT_GRADUATE_DETAIL_URL = "https://wis.ntu.edu.sg/pls/webexe88/pgr$query_subject_content.display_content_load"

CLASS_SCHEDULE_MAIN_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/aus_schedule.main"
CLASS_SCHEDULE_DETAIL_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SCHEDULE.main_display1"

EXAM_SCHEDULE_MAIN_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/exam_timetable_und.MainSubmit"
EXAM_SCHEDULE_DETAIL_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/exam_timetable_und.Get_detail"
EXAM_SCHEDULE_SEMESTER_VALUE_1 = "101"
EXAM_SCHEDULE_SEMESTER_VALUE_2 = "100"

COURSE_VACANCIES_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/aus_vacancy.check_vacancy2"


class CourseContentDetailType:
    prerequisite = "Prerequisite:"
    grade_type = "Grade Type: "
    mutex = "Mutually exclusive with: "
    na_to = "Not available to Programme: "
    na_to_all = "Not available to all Programme with: "
    na_to_as_core = "Not available as Core to Programme: "
    na_to_as_pe = "Not available as PE to Programme: "
    na_to_as_ue = "Not available as UE to Programme: "
    na_to_as_ue_nationality = "Not available as UE to Nationality: "
    na_to_as_ue_race = "Not available as UE to Race: "
    remark = "Remark:"

    NAME_TO_VALUE = dict((k, v) for k, v in locals().items())
    VALUE_TO_NAME = dict((v, k) for k, v in NAME_TO_VALUE.items())


#  For analysis of crawled data
class Days:
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6
    SUNDAY = 7

    NAME_TO_VALUE = dict((k, v) for k, v in locals().items())
    VALUE_TO_NAME = dict((v, k) for k, v in NAME_TO_VALUE.items())
    VALUE_TO_NAME.update({"MON": 1, "TUE": 2, "WED": 3,
                          "THU": 4, "FRI": 5, "SAT": 6, "SUN": 7})


class GradeType:
    default = 0
    pass_or_fail = 1

    ID_TO_READABLE = {
        0: "Default",
        1: "Pass/Fail",
    }
    READABLE_TO_ID = dict((v, k) for k, v in ID_TO_READABLE.items())


CONSTRING_KEYS = []
for key in CourseContentDetailType.NAME_TO_VALUE.keys():
    if not key.startswith("__"):
        CONSTRING_KEYS.append(key)
CONSTRING_KEYS.remove("grade_type")
CONSTRING_KEYS.remove("remark")

ONLINE_COURSE_REMARK = -1

NULL_TD_VALUE = '\xa0'
INDEX_VACANCIES_INDEX = 0
INDEX_VACANCIES_VACANCIES = 1
INDEX_VACANCIES_WAITLIST = 2

VALID_COURSE_NUMBER_LOWER_BOUND = 200
