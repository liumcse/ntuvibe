from crawl_class_schedule import crawl
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


def save(db, course_code, class_schedule):
    # TODO(liumcse): delete out of date schedule
    data = {
        "last_update": datetime.datetime.now(),
        "schedules": []
    }
    indices = class_schedule["indices"]
    course_title_last_characters = class_schedule["title"][-3:]
    for index, slots in indices.items():
        for slot in slots:
            try:
                if not slot["time"].strip():
                    start_time_str = "0000"
                    end_time_str = "0000"
                else:
                    start_time_str, end_time_str = slot["time"].split("-")
            except Exception:
                print("Wrong time format: %s, should be HHMM-HHMM" %
                      slot["time"])

            start_time = str(datetime.time(
                hour=int(start_time_str[0:2]), minute=int(start_time_str[2:4])))
            end_time = str(datetime.time(
                hour=int(end_time_str[0:2]), minute=int(end_time_str[2:4])))
            data["schedules"].append({
                "index": index,
                "start_time": start_time,
                "end_time": end_time,
                "day": Days.VALUE_TO_NAME.get(slot["day"], "0"),
                "type": slot["type"],
                "venue": slot["venue"],
                "group": slot["group"],
                "weeks": get_weeks_string_from_remark(slot["remark"])
            })
    # Update collection schedules
    collection_schedules = db.collection("schedules")
    collection_schedules.document(course_code.upper()).set(data)
    # Update collection courses
    collection_courses = db.collection("courses")
    doc = collection_courses.document(course_code.upper()).get().to_dict()
    if doc:
        doc["as_ue"] = "*" in course_title_last_characters
        doc["as_pe"] = "#" in course_title_last_characters
        doc["last_update"] = datetime.datetime.now()
        collection_courses.document(course_code.upper()).set(doc)


if __name__ == "__main__":
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import firestore
    # Use a service account
    cred = credentials.Certificate('./serviceKey.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    class_schedules = crawl()
    count = 0
    total_count = len(class_schedules.items())
    for course_code, class_schedule in class_schedules.items():
        count += 1
        print('processing', count, 'ouf of', total_count)
        save(db, course_code, class_schedule)
