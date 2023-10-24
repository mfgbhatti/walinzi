from django.urls import path

from backend.customer.views import CustomerViewSet


urlpatterns = [
    path("all/", CustomerViewSet.as_view({"get": "list"})),
    path("get/<pk>/", CustomerViewSet.as_view({"get": "retrieve"})),
    path("create/", CustomerViewSet.as_view({"post": "create"})),
    path("search/<pk>/", CustomerViewSet.as_view({"get": "retrieve"})),
    path("update/<pk>/", CustomerViewSet.as_view({"put": "update"})),
    path("delete/<pk>/", CustomerViewSet.as_view({"delete": "destroy"})),
]
