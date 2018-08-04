import time
import hashlib
from django.core.mail import send_mail
from django.template import Context
from django.template.loader import render_to_string, get_template
from django.contrib.auth.models import User

# from django.db import models
from django.utils.translation import gettext as _
from django.db.models.fields import PositiveIntegerRelDbTypeMixin, BigIntegerField

from django.db.models.fields import BigIntegerField
from django.core.cache import cache
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
#
#
#


def get_timestamp():
	return int(time.time())


def generate_activate_account_token(user, timestamp=None):
	hash = hashlib.sha256()
	if not timestamp:
		timestamp = get_timestamp()
	hash.update(user.username)
	hash.update(timestamp)
	hash.update(user.is_active)

	cache.set(user.username, timestamp, timeout=60*60*60*24)

	return hash.hexdigest()



def send_activate_account_email(user):
	try:
		subject = "Welcome to ntuvibe"
		to = [user.email]
		from_email = 'ntuvibe_adminteam@gmail.com'
		token = generate_activate_account_token(user)

		message = render_to_string('static/template/activate_account.html', {'username':user.username, 'token': token})
		send_mail(subject, message, from_email, to, html_message=message)

		return {'success': True}
	except Exception as e:
		return {'success': False, 'error': str(e)}


def validate_email_activation_token(user, token):
	original_timestamp = cache.get(user.username)
	if not original_timestamp:
		send_activate_account_email(user)
		return({'success': False, 'error': 'previous token does not exist or expired'})
	original_token = generate_activate_account_token(user, original_timestamp)
	if original_token == token:
		return {"success": True}
	return {'success': False, 'error': 'not validated'}