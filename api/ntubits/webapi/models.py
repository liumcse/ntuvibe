from django.db import models
from .utils import PositiveBigIntegerField


class CourseTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	course_code = models.CharField(max_length=8, db_index=True)
	name = models.CharField(max_length=128, db_index=True)
	au = models.FloatField()
	prerequisite = models.TextField()
	description = models.TextField()
	last_updated = models.PositiveIntegerField()
	ctime = models.PositiveIntegerField()


class UserTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	username = models.CharField(max_length=32)
	salt = models.CharField(max_length=64)
	hashed_passwd = models.CharField(max_length=64)
	email = models.CharField(max_length=32)
	profile_photo = models.CharField(max_length=64, default="")


class CourseRatingTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	userid = PositiveBigIntegerField(db_index=True)
	courseid = PositiveBigIntegerField(db_index=True)
	useful = models.IntegerField()
	easy = models.IntegerField()
	like = models.IntegerField()
	comment = models.TextField(default="")


class ProfessorTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	courseid = PositiveBigIntegerField(db_index=True)
	name = models.CharField(max_length=32)
	title = models.CharField(max_length=16)
	photo = models.CharField(max_length=64, default="")
	description = models.TextField()


class ProfessorRatingTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	userid = PositiveBigIntegerField(db_index=True)
	profid = PositiveBigIntegerField(db_index=True)
	clarity = models.IntegerField()
	enthusiasm = models.IntegerField()
	helpful = models.IntegerField()
	comment = models.TextField(default="")


class ClassScheduleTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	courseid = PositiveBigIntegerField()
	index = models.IntegerField()
	start_time = models.TimeField()
	end_time = models.TimeField()
	day = models.IntegerField() # 1 ~ 6
	type = models.CharField(max_length=16) # whether it is lab or tutorial or lecture
	venue = models.CharField(max_length=16)
	group = models.CharField(max_length=16)
	remark = models.CharField(max_length=32) # which teaching weeks does it take place

	class Meta:
		indexes = [
			models.Index(fields=['courseid', 'index'])
		]


class ExamScheduleTab(models.Model):
	id = models.BigAutoField(primary_key=True)
	courseid = PositiveBigIntegerField(db_index=True)
	date = models.CharField(max_length=32)
	day = models.IntegerField()
	time = models.TimeField()
	duration = models.FloatField()