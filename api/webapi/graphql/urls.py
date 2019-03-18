from django.urls import path, include
from graphene_django.views import GraphQLView

urlpatterns = [
    path(r'', GraphQLView.as_view(graphiql=True)),
]
