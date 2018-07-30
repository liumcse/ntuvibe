from django.urls import path, include
from . import views

urlpatterns = [
	path(r'add_prof/<int:course_id>', views.create_prof),
	path(r'add_prof_rating/<int:prof_id>', views.add_prof_rating),
]
