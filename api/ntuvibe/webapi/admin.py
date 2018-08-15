from django.contrib import admin
from .models import ReservedWordTab, CensoredWordTab
from .utils import get_formatted_datetime_from_timestamp

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
