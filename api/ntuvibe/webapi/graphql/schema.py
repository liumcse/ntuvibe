import graphene
from graphene_django import DjangoObjectType
from webapi.models import *


class Courses(DjangoObjectType):

    class Meta:
        model = CourseTab


class CourseRatings(DjangoObjectType):

    class Meta:
        model = CourseRatingTab


class ClassSchedules(DjangoObjectType):
    class Meta:
        model = ClassScheduleTab


class Query(graphene.ObjectType):
    courses = graphene.List(Courses)
    courseRatings = graphene.List(CourseRatings)
    classSchedules = graphene.List(ClassSchedules)

    def resolve_courses(self, info):
        return CourseTab.objects.all()

    def resolve_classSchedules(self, info):
        return ClassScheduleTab.objects.all()

    # def resolve_courseRatings(self, info):
    #     return CourseRatingTab.objects.all()

    def resolve_courseRatings(self, info, **kwargs):
        if "courseCode" in kwargs:
            courseCode = kwargs.get("courseCode")
            course = CourseTab.objects.get(course_code=courseCode)
            if course:
                course_id = course.id
                return CourseRatingTab.objects.get(id=course_id)


schema = graphene.Schema(query=Query)
