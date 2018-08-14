from django.db import models
from django.db.models import query
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .utils import PositiveBigIntegerField, get_timestamp


class AutoSaveQuerySet(query.QuerySet):
	def create(self, **kwargs):
		now = get_timestamp()
		kwargs.update({"create_time": now})
		kwargs.update({"update_time": now})
		super(AutoSaveQuerySet, self).create(**kwargs)

	def update(self, **kwargs):
		kwargs.update({"update_time": get_timestamp()})
		super(AutoSaveQuerySet, self).update(**kwargs)


class AutoSaveModel(models.Model):
	objects = AutoSaveQuerySet.as_manager()

	class Meta:
		abstract = True

	def save(self, *args, **kwargs):
		now = get_timestamp()
		if self.create_time is None:
			self.create_time = now
		self.update_time = now
		super(AutoSaveModel, self).save(*args, **kwargs)


class UserProfile(AutoSaveModel):
	user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
	major = models.CharField(max_length=128)
	avatar = models.CharField(max_length=512)
	create_time = models.PositiveIntegerField()
	update_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_user_profile_tab"


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
	if created:
		UserProfile.objects.create(user=instance, major="", avatar="")


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
	instance.profile.save()


class CourseTab(AutoSaveModel):
	id = models.BigAutoField(primary_key=True)
	course_code = models.CharField(max_length=8, db_index=True)
	course_title = models.CharField(max_length=128, db_index=True)
	au = models.FloatField()
	description = models.TextField()
	constraint = models.TextField()  # {"prerequisite": , "mutex": , "na_to_..": }
	grade_type = models.IntegerField()
	as_pe = models.BooleanField()
	as_ue = models.BooleanField()
	semesters = models.TextField()  # ["2017_2", "2018_1"]
	create_time = models.PositiveIntegerField()
	update_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_course_tab"


class CourseRatingTab(AutoSaveModel):
	id = models.BigAutoField(primary_key=True)
	user_id = PositiveBigIntegerField(db_index=True)
	course_id = PositiveBigIntegerField(db_index=True)
	useful = models.IntegerField()
	easy = models.IntegerField()
	like = models.IntegerField()
	comment = models.TextField(default="")
	create_time = models.PositiveIntegerField()
	update_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_course_rating_tab"


class ProfessorTab(AutoSaveModel):
	id = models.BigAutoField(primary_key=True)
	course_id = PositiveBigIntegerField(db_index=True)
	name = models.CharField(max_length=32)
	title = models.CharField(max_length=16)
	photo = models.CharField(max_length=64, default="")
	description = models.TextField()
	create_time = models.PositiveIntegerField()
	update_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_professor_tab"


class ProfessorRatingTab(AutoSaveModel):
	id = models.BigAutoField(primary_key=True)
	user_id = PositiveBigIntegerField(db_index=True)
	prof_id = PositiveBigIntegerField(db_index=True)
	clarity = models.IntegerField()
	enthusiasm = models.IntegerField()
	helpful = models.IntegerField()
	comment = models.TextField(default="")
	create_time = models.PositiveIntegerField()
	update_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_professor_rating_tab"


class ClassScheduleTab(AutoSaveModel):
	id = models.BigAutoField(primary_key=True)
	course_id = PositiveBigIntegerField()
	index = models.IntegerField()
	start_time = models.TimeField()  # a datetime.time instance
	end_time = models.TimeField()  # a datetime.time instance
	day = models.IntegerField()  # 1 ~ 6
	type = models.CharField(max_length=16)  # whether it is lab or tutorial or lecture
	venue = models.CharField(max_length=16)
	group = models.CharField(max_length=16)
	weeks = models.CharField(max_length=128)  # which teaching weeks does it take place
	create_time = models.PositiveIntegerField()
	update_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_class_schedule_tab"
		indexes = [
			models.Index(fields=['course_id', 'index'])
		]


class ExamScheduleTab(AutoSaveModel):
	id = models.BigAutoField(primary_key=True)
	course_id = PositiveBigIntegerField(db_index=True)
	start_time = PositiveBigIntegerField(db_index=True)
	end_time = PositiveBigIntegerField(db_index=True)
	create_time = models.PositiveIntegerField()
	update_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_exam_schedule_tab"


class ConfigTab(AutoSaveModel):
	id = models.BigAutoField(primary_key=True)
	key = PositiveBigIntegerField(db_index=True)  # to be specified in constants.py later on
	value = models.CharField(max_length=128)
	notes = models.CharField(max_length=256)
	create_time = models.PositiveIntegerField()
	update_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_config_tab"


class ReservedWordTab(AutoSaveModel):
	id = models.BigAutoField(primary_key=True)
	value = models.CharField(max_length=64, db_index=True)
	create_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_reserved_word_tab"

class CensoredWordTab(AutoSaveModel):
	id = models.BigAutoField(primary_key=True)
	value = models.CharField(max_length=64, db_index=True)
	create_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_censored_word_tab"