from django.urls import path, include
from . import views

urlpatterns = [
	path('signup', views.user_signup),
	path('login', views.user_login),
	path('logout', views.user_logout),
	path('activate', views.user_activate),
]
