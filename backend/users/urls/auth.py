"""authentication end points"""

from django.urls import path
from backend.users.views.auth import LoginView, LogoutView, ChangePasswordView
from backend.users.views.refresh import CookieTokenRefreshView

urlpatterns = [
    path("sign-in/", LoginView.as_view(), name="token_obtain_pair"),
    path("refresh/", CookieTokenRefreshView.as_view(), name="auth_token_refresh"),
    path("sign-out/", LogoutView.as_view(), name="auth_logout"),
    path("change-password/", ChangePasswordView.as_view(), name="auth_change_password"),
]
