from django.urls import path

from backend.staff.views import StaffViewSet


urlpatterns = [
    path("all/", StaffViewSet.as_view({"get": "list"})),
    # path("by-customer/<pk>/", StaffViewSet.as_view({"get": "by_customer"})),
    path("get/<pk>/", StaffViewSet.as_view({"get": "retrieve"})),
    path("create/", StaffViewSet.as_view({"post": "create"})),
    path("search/<pk>/", StaffViewSet.as_view({"get": "retrieve"})),
    path("update/<pk>/", StaffViewSet.as_view({"put": "update"})),
    path("delete/<pk>/", StaffViewSet.as_view({"delete": "destroy"})),
]
