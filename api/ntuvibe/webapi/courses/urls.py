from django.urls import path, include
from . import views

urlpatterns = [
	path(r'get_course_list', views.get_course_list),
	path(r'get_course_detail', views.get_course_detail),
	path(r'get_class_schedule', views.get_class_schedule),
	path(r'get_exam_schedule', views.get_exam_schedule),
	path(r'get_course_vacancies', views.get_course_vacancies),
	path(r'get_course_rating', views.get_course_rating),
	path(r'get_course_comments', views.get_course_comments),
	path(r'get_user_course_comment', views.get_user_course_comment),
	path(r'submit_course_rating', views.submit_course_rating),
]
