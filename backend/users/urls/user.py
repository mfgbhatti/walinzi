"""urls for user app"""

from django.urls import path

from backend.users.views.user import UserViewSet, UserListViewSet

urlpatterns = [
    path("user/", UserViewSet.as_view({"get": "list",})),
    path("users/", UserListViewSet.as_view({"get": "list", "post": "create",})),
]