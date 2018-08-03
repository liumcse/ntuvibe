from django.urls import path, include
from . import views

urlpatterns = [
	path('/signup', views.sign_up),
	path('/login', views.login),
	path('/logout', views.logout),
	path('/activate_user', views.activate_user),
]
