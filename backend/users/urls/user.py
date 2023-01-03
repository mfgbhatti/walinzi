"""urls for user app"""

from django.urls import path

from backend.users.views.user import UserViewSet, UserListViewSet, UserByCustomerViewSet, CreateUserViewSet, UpdateUserViewSet

urlpatterns = [
    path("user/", UserViewSet.as_view({"get": "list",})),
    path("create-user/", CreateUserViewSet.as_view({"post": "create"})),
    path("update-user/<uuid:pk>/", UpdateUserViewSet.as_view({"put": "update"})),
    path("users/", UserListViewSet.as_view({"get": "list", "post": "create",})),
    path("users/<uuid:pk>/", UserByCustomerViewSet.as_view({"get": "list",})),
]