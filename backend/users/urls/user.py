"""urls for user app"""

from django.urls import path

from backend.users.views.user import UserViewSet

urlpatterns = [
    path("user/", UserViewSet.as_view({"get": "list",})),
]