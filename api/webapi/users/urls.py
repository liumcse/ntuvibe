from django.urls import path, include
from . import views

urlpatterns = [
	path('signup', views.user_signup),
	path('check_activation_link', views.check_activation_link),
	path('activate', views.user_activate),
	path('login', views.user_login),
	path('logout', views.user_logout),
	path('get_user_profile', views.get_user_profile),
	path('update_user_profile', views.update_user_profile),
	path('get_user_schedule', views.get_user_schedule),
	path('update_user_schedule', views.update_user_schedule),
	path('request_password_reset', views.user_request_password_reset),
	path('check_reset_password_link', views.check_reset_password_link),
	path('reset_password', views.reset_password),
]
