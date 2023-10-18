from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from backend.user.views import UserViewSet, activation_view, LoginView, LogoutView

app_name = "user"
urlpatterns = [
    path("all/", UserViewSet.as_view({"get": "list"})),
    path("create/", UserViewSet.as_view({"post": "create"})),
    path("activate/", activation_view, name="activate_user"),
    path("set_password/", activation_view, name="set_password"),
]

urlpatterns += [
    path("sign_in/", LoginView.as_view(), name="token_obtain_pair"),
    # path("verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("refresh/", TokenRefreshView.as_view(), name="auth_token_refresh"),
    path("sign_out/", LogoutView.as_view(), name="auth_logout"),
]
