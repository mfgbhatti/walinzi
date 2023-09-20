from django.urls import path

from backend.user.views import UserViewSet

app_name = "user"
urlpatterns = [
    path("all/", UserViewSet.as_view({"get": "list"})),
    path("create/", UserViewSet.as_view({"post": "create"})),
    path("activate/<uuid:pk>/<key>/", UserViewSet.as_view({"get": "list"}), name="activate_user"),
]
