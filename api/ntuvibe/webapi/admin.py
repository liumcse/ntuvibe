from django.contrib import admin
from webapi.models import ReservedWordTab, CensoredWordTab

admin.site.register(ReservedWordTab)
admin.site.register(CensoredWordTab)