import graphene
from graphene_django import DjangoObjectType
from webapi.models import *


class Courses(DjangoObjectType):

    class Meta:
        model = CourseTab


class Query(graphene.ObjectType):
    courses = graphene.List(Courses)

    def resolve_courses(self, info):
        print("At least I am called")
        return CourseTab.objects.all()


schema = graphene.Schema(query=Query)
