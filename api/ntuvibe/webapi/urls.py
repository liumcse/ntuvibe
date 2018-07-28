from django.urls import path, include
from . import views


course_url_patterns = [
	path(r'get_course_detail/<str:course_code>/', views.get_course_detail),
	path(r'get_course_list/', views.get_course_list),
	path(r'add_course_rating/', views.add_course_rating),
]

prof_url_patterns = [
	path(r'add_prof/<int:courseid>/$', views.create_prof),
	path(r'add_prof_rating/<int:profid>', views.add_prof_rating),
]

urlpatterns = [
	path(r'course/', include(course_url_patterns))
]
