from django.urls import path, include
from . import views

urlpatterns = [
	path(r'get_course_list', views.get_course_list),
	path(r'get_course_detail', views.get_course_detail),
	path(r'get_class_schedule', views.get_class_schedule),
	path(r'get_exam_schedule', views.get_exam_schedule),
	path(r'add_course_rating', views.add_course_rating),
]
