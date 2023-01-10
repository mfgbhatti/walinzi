"""
urls for client
"""

from django.urls import path
from .views import ClientViewSet, CreateClientViewSet

urlpatterns = [
    path("all/", ClientViewSet.as_view({"get": "list"})),
    # path("create/", ClientViewSet.as_view({"post": "create"})),
    path("create/", CreateClientViewSet.as_view({"post": "create"})),
    path("update/<int:pk>/", ClientViewSet.as_view({"put": "update"})),
    path("delete/<int:pk>/", ClientViewSet.as_view({"delete": "destroy"})),
    path("search/<int:pk>/", ClientViewSet.as_view({"get": "retrieve"})),
]
