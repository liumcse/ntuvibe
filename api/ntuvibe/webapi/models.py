from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .utils import PositiveBigIntegerField, get_timestamp


class UserProfile(models.Model):
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
		UserProfile.objects.create(user=instance, major="", avatar="", create_time=get_timestamp(), update_time=get_timestamp())


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
	instance.profile.update_time = get_timestamp()
	instance.profile.save()


class CourseTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	course_code = models.CharField(max_length=8, db_index=True)
	course_title = models.CharField(max_length=128, db_index=True)
	au = models.FloatField()
	description = models.TextField()
	constraint = models.TextField()  # {"prerequisite": , "mutex": , "na_to_..": }
	grade_type = models.IntegerField()
	as_pe = models.BooleanField()
	as_ue = models.BooleanField()
	create_time = models.PositiveIntegerField()
	update_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_course_tab"


class CourseRatingTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	user_id = PositiveBigIntegerField(db_index=True)
	course_id = PositiveBigIntegerField(db_index=True)
	useful = models.IntegerField()
	easy = models.IntegerField()
	like = models.IntegerField()
	comment = models.TextField(default="")
	create_time = models.PositiveIntegerField()

	class Meta:
		db_table = u"webapi_course_rating_tab"


class ProfessorTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	course_id = PositiveBigIntegerField(db_index=True)
	name = models.CharField(max_length=32)
	title = models.CharField(max_length=16)
	photo = models.CharField(max_length=64, default="")
	description = models.TextField()

	class Meta:
		db_table = u"webapi_professor_tab"


class ProfessorRatingTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	user_id = PositiveBigIntegerField(db_index=True)
	prof_id = PositiveBigIntegerField(db_index=True)
	clarity = models.IntegerField()
	enthusiasm = models.IntegerField()
	helpful = models.IntegerField()
	comment = models.TextField(default="")

	class Meta:
		db_table = u"webapi_professor_rating_tab"


class ClassScheduleTab(models.Model):
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

	class Meta:
		db_table = u"webapi_class_schedule_tab"
		indexes = [
			models.Index(fields=['course_id', 'index'])
		]


class ExamScheduleTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	course_id = PositiveBigIntegerField(db_index=True)
	start_time = PositiveBigIntegerField(db_index=True)
	end_time = PositiveBigIntegerField(db_index=True)

	class Meta:
		db_table = u"webapi_exam_schedule_tab"


class ConfigTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	key = PositiveBigIntegerField(db_index=True)  # to be specified in constants.py later on
	value = models.CharField(max_length=128)
	notes = models.CharField(max_length=256)

	class Meta:
		db_table = u"webapi_config_tab"
