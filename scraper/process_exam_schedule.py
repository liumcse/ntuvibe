from crawl_exam_schedule import crawl
from constants import *
import re
import datetime


def get_weeks_string_from_remark(remark):
    if not remark.strip():
        return [i for i in range(1, 14)]
    if "Online Course" in remark:
        return [ONLINE_COURSE_REMARK]
    if "Teaching Wk" not in remark:
        return []
    weeks = []
    for splitted in remark.split(","):
        result = re.sub("[\sA-Za-z]", "", splitted).split("-")
        if len(result) == 1:
            weeks.append(int(result[0]))
        elif len(result) == 2:
            for week in range(int(result[0]), int(result[1]) + 1):
                weeks.append(week)
        else:
            print("wrong remark format: %s", remark)
    return weeks


def save(db, course_code, exam_schedule):
    # TODO(liumcse): delete out of date schedule
    start_str = exam_schedule["date"] + " " + exam_schedule["time"]
    start_time = datetime.datetime.strptime(
        start_str, "%d %B %Y %I.%M %p").timestamp()
    end_time = start_time + int(60.0 * 60.0 * float(exam_schedule["duration"]))
    data = {
        "last_update": datetime.datetime.now(),
        "start_time": start_time,
        "end_time": end_time
    }

    # Update collection schedules
    collection_exams = db.collection("exams")
    collection_exams.document(course_code.upper()).set(data)


if __name__ == "__main__":
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import firestore
    # Use a service account
    cred = credentials.Certificate('./serviceKey.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    exam_schedules = crawl()
    count = 0
    total_count = len(exam_schedules.items())
    for course_code, exam_schedule in exam_schedules.items():
        count += 1
        print('processing', count, 'ouf of', total_count)
        save(db, course_code, exam_schedule)
