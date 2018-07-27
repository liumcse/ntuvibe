from django.urls import path, include
from . import views


course_url_patterns = [
	path(r'get_course_detail/<str:course_code>/', views.get_course_detail),
	path(r'get_course_list/', views.get_course_list),
	path(r'add_course_rating/', views.add_course_rating),
]

urlpatterns = [
	path(r'course/', include(course_url_patterns))
]
