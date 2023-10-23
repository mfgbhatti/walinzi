from django.urls import path

from backend.location.views import LocationViewSet


urlpatterns = [
    path("all/", LocationViewSet.as_view({"get": "list"})),
    path("get/<pk>/", LocationViewSet.as_view({"get": "retrieve"})),
    path("create/", LocationViewSet.as_view({"post": "create"})),
    path("search/<pk>/", LocationViewSet.as_view({"get": "retrieve"})),
    path("update/<pk>/", LocationViewSet.as_view({"put": "update"})),
    path("delete/<pk>/", LocationViewSet.as_view({"delete": "destroy"})),
]
