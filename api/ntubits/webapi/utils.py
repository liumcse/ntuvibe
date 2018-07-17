from django.db import models

class PositiveBigIntergerRelDbTypeMixin(models.PositiveIntegerRelDbTypeMixin):
#credit to github user pinfort
	def rel_db_type(self, connection):
		if connection.features.related_fields_match_type:
			return self.db_type(connection)
		else:
			return models.BigIntegerField().db_type(connection=connection)


class PositiveBigIntegerField(PositiveBigIntegerRelDbTypeMixin, models.BigIntegerField):
#credit to github user pinfort
	description = _("Positive big integer")

	def get_internal_type(self):
		return "PositiveBigIntegerField"

	def formfield(self, **kwargs):
		defaults = {'min_value': 0}
		defaults.update(kwargs)
		return super().formfield(**defaults)

	def db_type(self, connection):
		# get db vendor ex.mysql, postgresql, sqlite...
		db_vendor = connection.vendor
		if db_vendor == "mysql":
			return "bigint UNSIGNED"
		elif db_vendor == "oracle":
			return "NUMBER(20)"
		elif db_vendor == "postgresql":
			# postgresql is not supported 'unsigned'
			return "bigint"
		elif db_vendor == "sqlite":
			return "bigint unsigned"
		else:
			# if db_vendor is unknown(BaseDatabaseWrapper), we should return None
			return None



def now():
	return int(now.now())