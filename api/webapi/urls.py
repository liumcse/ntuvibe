from django.urls import path, include
from graphene_django.views import GraphQLView
from . import views

urlpatterns = [
    path(r'courses/', include("webapi.courses.urls")),
    path(r'users/', include('webapi.users.urls')),
    path(r'graphql/', include('webapi.graphql.urls'))
]
