from django.urls import path

from backend.shift.views import ShiftViewSet


urlpatterns = [
    path("all/", ShiftViewSet.as_view({"get": "list"})),
    path("get/<pk>/", ShiftViewSet.as_view({"get": "retrieve"})),
    path("create/", ShiftViewSet.as_view({"post": "create"})),
    path("search/<pk>/", ShiftViewSet.as_view({"get": "retrieve"})),
    path("update/<pk>/", ShiftViewSet.as_view({"put": "update"})),
    path("delete/<pk>/", ShiftViewSet.as_view({"delete": "destroy"})),
]
