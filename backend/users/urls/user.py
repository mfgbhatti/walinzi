"""urls for user app"""

from django.urls import path

from backend.users.views.user import UserViewSet, UsersViewSet

urlpatterns = [
    path("user/", UserViewSet.as_view({"get": "list",})),
    path("users/", UsersViewSet.as_view({"get": "list",})),
]