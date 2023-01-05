"""urls for customers"""
from django.urls import path

from .views import CustomerViewSet, CustomerListViewSet

urlpatterns = [
    path("customers/", CustomerListViewSet.as_view({"get": "list",})),
    path("customers/create/", CustomerViewSet.as_view({"post": "create",})),
    path("customers/get/<uuid:pk>/", CustomerViewSet.as_view({"get": "retrieve"})),
    path("customers/update/<uuid:pk>/", CustomerViewSet.as_view({"put": "update"})),
    path("customers/delete/<uuid:pk>/", CustomerViewSet.as_view({"delete": "destroy"})),
]