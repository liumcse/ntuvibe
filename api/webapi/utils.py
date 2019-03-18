import time
import logging
from datetime import datetime
from django.http import JsonResponse

from django.db.models.fields import BigIntegerField
from .constants import StatusCode


PositiveBigIntegerField = BigIntegerField


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


def get_formatted_datetime_from_timestamp(timestamp=get_timestamp()):
	return datetime.fromtimestamp(timestamp).strftime("%d %b, %Y / %H:%M:%S")


def get_hour_from_timestamp(timestamp=get_timestamp()):
	return int(datetime.fromtimestamp(timestamp).strftime("%H"))


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
					log.warning("api_response_decorator|error_code=%s,error_message=%s", error_code, error_message)
				except Exception:
					error_code = StatusCode.BUG_GENERAL[0]
					error_message = str(ex)
					log.exception("api_response_decorator|error_code=%s,error_message=%s", error_code, error_message)
				return JsonResponse({"success": False, "error_message": error_message}, status=error_code)
		return _func
	return _api_response
