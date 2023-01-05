"""urls for user app"""

from django.urls import path

from backend.users.views.user import UserViewSet, UserByCustomerViewSet, CreateUserViewSet, UpdateUserViewSet, DeleteUserViewSet

urlpatterns = [
    path("users/get/", UserViewSet.as_view({"get": "list",})),
    path("users/create/", CreateUserViewSet.as_view({"post": "create"})),
    path("users/update/<uuid:pk>/", UpdateUserViewSet.as_view({"put": "update"})),
    path("users/delete/<uuid:pk>/", DeleteUserViewSet.as_view({"delete": "destroy"})),
    path("users/get-list/<uuid:pk>/", UserByCustomerViewSet.as_view({"get": "list",})),
]