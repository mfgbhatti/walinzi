"""
urls for client
"""

from django.urls import path
from .views import ClientViewSet, SearchClientByNameView

urlpatterns = [
    path("all/", ClientViewSet.as_view({"get": "list"})),
    path("create/", ClientViewSet.as_view({"post": "create"})),
    path("update/<uuid:pk>/", ClientViewSet.as_view({"put": "update"})),
    path("delete/<uuid:pk>/", ClientViewSet.as_view({"delete": "destroy"})),
    path("search/", SearchClientByNameView.as_view({"get": "retrieve"})),
]
