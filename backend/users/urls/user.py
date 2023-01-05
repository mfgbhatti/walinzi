"""urls for user app"""

from django.urls import path

from backend.users.views.user import UserViewSet, UserListViewSet, UserByCustomerViewSet, CreateUserViewSet, UpdateUserViewSet

urlpatterns = [
    path("users/get/", UserViewSet.as_view({"get": "list",})),
    path("users/create/", CreateUserViewSet.as_view({"post": "create"})),
    path("users/update/<uuid:pk>/", UpdateUserViewSet.as_view({"put": "update"})),
    path("users/get-list/<uuid:pk>/", UserByCustomerViewSet.as_view({"get": "list",})),
]