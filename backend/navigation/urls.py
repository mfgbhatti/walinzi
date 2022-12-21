"""urls for navigation app"""
from django.urls import path

from .views import NavigationViewSet

urlpatterns = [
    path("navigation/", NavigationViewSet.as_view({"get": "list"})),
]
