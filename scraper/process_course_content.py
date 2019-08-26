from crawl_course_content import crawl, get_latest_semester
from constants import *
import datetime


def get_constraint(course_content):
    constraint_pairs = []
    for key in CONSTRING_KEYS:
        if course_content.get(key):
            constraint_pairs.append((key, course_content[key]))
    constraints = dict(constraint_pairs)
    return constraints


def save(db, semester, course_code, course_content):
    data = {
        # as_ue
        # as_pe
        "course_title": course_content["title"],
        "au": float(course_content["au"]),
        "description": course_content["description"],
        "constraint": get_constraint(course_content),
        "grade_type": bool(GradeType.READABLE_TO_ID[course_content.get("grade_type", "Default")]),
        "postgrad": False,
        "last_update": datetime.datetime.now()
    }
    collection = db.collection('courses')
    course = collection.document(course_code.upper())
    course_doc = course.get().to_dict()
    if course_doc:
        semesters = course_doc["semesters"]
        semesters.append(semester)
        semesters = sorted(list(set(semesters)))
        data["semesters"] = semesters
        course.set(data)
    else:
        data["semesters"] = [semester]
        course.set(data)


if __name__ == "__main__":
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import firestore
    # Use a service account
    cred = credentials.Certificate('./serviceKey.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    # semester = get_latest_semester()
    semester = "2018_1"
    crawl_result = crawl(semester)
    total_count = len(crawl_result.items())
    count = 0
    for course_code, course_content in crawl_result.items():
        count += 1
        print('processing', count, 'ouf of', total_count)
        save(db, semester, course_code, course_content)
