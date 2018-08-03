from django.urls import path, include
from . import views

urlpatterns = [
	path(r'courses/', include("webapi.courses.urls")),
	path(r'profs/', include("webapi.profs.urls")),
	# path(r'users/', include('webapi.users.urls')),
]
