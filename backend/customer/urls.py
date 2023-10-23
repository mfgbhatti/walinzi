from django.urls import path

from backend.customer.views import CustomerViewSet


urlpatterns = [
    path("all/", CustomerViewSet.as_view({"get": "list"})),
    path("get_customer/<uuid:pk>/", CustomerViewSet.as_view({"get": "retrieve"})),
    path("create/", CustomerViewSet.as_view({"post": "create"})),
    path("search/<uuid:pk>/", CustomerViewSet.as_view({"get": "retrieve"})),
    path("update/<uuid:pk>/", CustomerViewSet.as_view({"put": "update"})),
    path("delete/<uuid:pk>/", CustomerViewSet.as_view({"delete": "destroy"})),
]
