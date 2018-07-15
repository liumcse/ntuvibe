COURSE_CONTENT_MAIN_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/aus_subj_cont.main"
COURSE_CONTENT_CATEGORY_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SUBJ_CONT.main_display"
COURSE_CONTENT_DETAIL_URL = "https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SUBJ_CONT.main_display1"


class COURSE_CONTENT_DETAIL_TYPE:
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

