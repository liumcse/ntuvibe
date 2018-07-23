from django.urls import path
from . import views

urlpatterns = [
	path(r'^course/get_course_detail/{course_code}$', views.get_course_detail),
	path(r'^course/get_course_list$', views.get_course_list),
	path(r'course/add_course_rating$', views.add_course_rating),
]