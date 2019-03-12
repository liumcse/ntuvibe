import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q
from webapi.models import *
import urllib
import re
import itertools


def build_regex_from_keyword_list(keyword_list):
    """This function builds regex pattern from a list of keywords

    :param keyword_list: list of keywords
    :type keyword_list: List
    :return: regex
    :rtype: str
    """
    splitted_keywords = urllib.parse.unquote(keyword_list).split("+")
    permutated_keyword_list = list(
        itertools.permutations(splitted_keywords))
    regex_pre_build = list(
        map(lambda x: "(.*" + "+.*".join(x) + ".*)+", permutated_keyword_list))
    regex = re.compile("|".join(regex_pre_build)).pattern
    return regex


class CourseType(DjangoObjectType):

    class Meta:
        model = CourseTab


class Query(graphene.ObjectType):
    courses = graphene.List(
        CourseType, keywords=graphene.String())

    def resolve_courses(self, info, **kwargs):
        keywords = kwargs.get("keywords")

        if keywords is not None:
            regex = build_regex_from_keyword_list(keyword_list=keywords)
            return CourseTab.objects.filter(Q(course_code__iregex=regex) | Q(course_title__iregex=regex) | Q(description__iregex=regex))

        return CourseTab.objects.all()


schema = graphene.Schema(query=Query)
