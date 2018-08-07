import time
import logging
from django.http import JsonResponse

from django.db.models.fields import BigIntegerField
from .constants import StatusCode


PositiveBigIntegerField = BigIntegerField
# class PositiveBigIntergerRelDbTypeMixin(PositiveIntegerRelDbTypeMixin):
# #credit to github user pinfort
# 	def rel_db_type(self, connection):
# 		if connection.features.related_fields_match_type:
# 			return self.db_type(connection)
# 		else:
# 			return BigIntegerField().db_type(connection=connection)
#
#
# class PositiveBigIntegerField(PositiveBigIntergerRelDbTypeMixin, BigIntegerField):
# #credit to github user pinfort
# 	description = _("Positive big integer")
#
# 	def get_internal_type(self):
# 		return "PositiveBigIntegerField"
#
# 	def formfield(self, **kwargs):
# 		defaults = {'min_value': 0}
# 		defaults.update(kwargs)
# 		return super().formfield(**defaults)
#
# 	def db_type(self, connection):
# 		# get db vendor ex.mysql, postgresql, sqlite...
# 		db_vendor = connection.vendor
# 		if db_vendor == "mysql":
# 			return "bigint UNSIGNED"
# 		elif db_vendor == "oracle":
# 			return "NUMBER(20)"
# 		elif db_vendor == "postgresql":
# 			# postgresql is not supported 'unsigned'
# 			return "bigint"
# 		elif db_vendor == "sqlite":
# 			return "bigint unsigned"
# 		else:
# 			# if db_vendor is unknown(BaseDatabaseWrapper), we should return None
# 			return None


def append_exc(func):
	def _append_exc(*args, **kwargs):
		if 'exc_info' not in kwargs:
			kwargs['exc_info'] = True
		return func(*args, **kwargs)
	return _append_exc


log = logging.getLogger('main')
log.exception = append_exc(log.error)
log.assertion = log.critical
log.data = logging.getLogger('data').info


def get_timestamp():
	return int(time.time())


def api_response(login_required=False):
	def _api_response(func):
		def _func(request, *args, **kwargs):

			try:
				if login_required:
					if not request.user or not request.user.is_authenticated:
						raise Exception(StatusCode.NOT_LOGGED_IN)
					if not request.user.is_active:
						raise Exception(StatusCode.NOT_ACTIVATED)
				data = func(request, *args, **kwargs)
				return JsonResponse({"success": True, "data": data})

			except Exception as ex:
				try:
					error_code, error_message = ex.args[0]
					if not isinstance(error_code, int) or not isinstance(error_message, str):
						raise Exception
					log.error("api_response_decorator|error_code=%s, error_message=%s", error_code, error_message)
				except Exception:
					error_code = StatusCode.BUG_GENERAL[0]
					error_message = str(ex)
					log.exception("api_response_decorator|error_code=%s, error_message=%s", error_code, error_message)
				return JsonResponse({"success": False, "error_message": error_message}, status=error_code)
		return _func
	return _api_response
