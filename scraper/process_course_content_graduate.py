from crawl_course_content_graduate import crawl, get_latest_semester
from constants import *
import datetime


def save(db, semester, course_code, course_content):
    data = {
        # as_ue
        # as_pe
        "course_title": course_content["title"],
        "au": float(course_content["au"]),
        "description": course_content["description"],
        "postgrad": True,
        "last_update": datetime.datetime.now()
    }
    collection = db.collection('courses')
    course = collection.document(course_code.upper())
    course.set(data)


if __name__ == "__main__":
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import firestore
    # Use a service account
    cred = credentials.Certificate('./serviceKey.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    semester = get_latest_semester()
    crawl_result = crawl(semester)
    total_count = len(crawl_result.items())
    count = 0
    for course_code, course_content in crawl_result.items():
        count += 1
        print('processing', count, 'ouf of', total_count)
        save(db, semester, course_code, course_content)
