from crawl_class_schedule import crawl
import datetime


def save(db, course_code, class_schedule):
    data = {
        "last_update": datetime.datetime.now(),
        "as_ue": False,
        "as_pe": False,
    }
    collection_additional_info = db.collection("additional_info")
    course_title_last_characters = class_schedule["title"][-3:]
    data["as_ue"] = "*" in course_title_last_characters
    data["as_pe"] = "#" in course_title_last_characters
    collection_additional_info.document(course_code.upper()).set(data)


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
