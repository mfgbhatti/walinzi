"""urls for customers"""
from django.urls import path

from backend.users.views.customer import CustomerViewSet, CustomerListViewSet

urlpatterns = [
    path("customers/", CustomerListViewSet.as_view({"get": "list",})),
    path("customers/create/", CustomerViewSet.as_view({"post": "create",})),
    path("customers/<uuid:pk>/", CustomerViewSet.as_view({"get": "retrieve", "put": "update", "delete": "destroy"})),
]