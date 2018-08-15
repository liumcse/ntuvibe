from django.contrib import admin
from .models import ReservedWordTab, CensoredWordTab, CourseRatingTab
from .utils import get_formatted_datetime_from_timestamp
from .manager import user_manager, course_manager

# admin.site.disable_action('delete_selected')


class WordAdmin(admin.ModelAdmin):
	list_display = ["value", "formatted_create_time", "formatted_update_time"]
	ordering = ["value"]
	search_fields = ["value"]
	fields = ["value"]

	def formatted_create_time(self, word):
		return get_formatted_datetime_from_timestamp(word.create_time)

	def formatted_update_time(self, word):
		return get_formatted_datetime_from_timestamp(word.update_time)


admin.site.register(ReservedWordTab, WordAdmin)
admin.site.register(CensoredWordTab, WordAdmin)


class CourseRatingAdmin(admin.ModelAdmin):
	list_display = ["username", "course_code", "easy", "useful", "like", "comment", "formatted_create_time", "formatted_update_time"]
	ordering = ["update_time"]
	search_fields = ["username", "course_code"]
	fields = ["comment"]

	def username(self, rating):
		user = user_manager.get_user_by_user_id(rating.user_id)
		return user.username

	def course_code(self, rating):
		course = course_manager.get_course_by_course_id(rating.course_id)
		return course.course_code

	def formatted_create_time(self, rating):
		return get_formatted_datetime_from_timestamp(rating.create_time)

	def formatted_update_time(self, rating):
		return get_formatted_datetime_from_timestamp(rating.update_time)

	formatted_create_time.admin_order_field = "create_time"
	formatted_update_time.admin_order_field = "update_time"


admin.site.register(CourseRatingTab, CourseRatingAdmin)
