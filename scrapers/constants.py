COURSE_CONTENT_MAIN_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/aus_subj_cont.main"
COURSE_CONTENT_CATEGORY_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SUBJ_CONT.main_display"
COURSE_CONTENT_DETAIL_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SUBJ_CONT.main_display1"


class CourseContentDetailType:
    prerequisite = "Prerequisite:"
    grade_type = "Grade Type: "
    mutex = "Mutually exclusive with: "
    na_to = "Not available to Programme: "
    na_to_all = "Not available to all Programme with: "
    na_to_as_core = "Not available as Core to Programme: "
    na_to_as_pe = "Not available as PE to Programme: "
    na_to_as_ue = "Not available as UE to Programme: "
    remark = "Remark:"

    NAME_TO_VALUE = dict((k, v) for k, v in locals().items())
    VALUE_TO_NAME = dict((v, k) for k, v in NAME_TO_VALUE.items())


CLASS_SCHEDULE_MAIN_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/aus_schedule.main"
CLASS_SCHEDULE_CATEGORY_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SCHEDULE.main_display"
CLASS_SCHEDULE_DETAIL_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SCHEDULE.main_display1"

EXAM_SCHEDULE_MAIN_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/exam_timetable_und.MainSubmit"
EXAM_SCHEDULE_DETAIL_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/exam_timetable_und.Get_detail"

EXAM_SCHEDULE_USEFUL_SEMESTER_VALUE = "3"


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
    VALUE_TO_NAME.update({"MON": 1, "TUE": 2, "WED": 3, "THU": 4, "FRI": 5, "SAT": 6, "SUN": 7})


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
