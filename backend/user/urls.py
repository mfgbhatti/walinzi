from django.urls import path

from backend.user.views import (
    UserViewSet,
    user_activation_view,
    LogoutView,
    CookieTokenObtainPairView,
    CookieTokenRefreshView,
)

app_name = "user"
urlpatterns = [
    path("all/", UserViewSet.as_view({"get": "list"})),
    path("create/", UserViewSet.as_view({"post": "create"})),
    path("activate/", user_activation_view, name="activate_user"),
    path("set_password/", user_activation_view, name="set_password"),
]

urlpatterns += [
    path("sign-in/", CookieTokenObtainPairView.as_view(), name="token_obtain_pair"),
    # path("verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("refresh/", CookieTokenRefreshView.as_view(), name="auth_token_refresh"),
    path("sign-out/", LogoutView.as_view(), name="auth_logout"),
]
