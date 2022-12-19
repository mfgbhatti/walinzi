"""authentication end points"""

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from backend.users.views import auth as views

urlpatterns = [
    path("sign-in/", views.LoginView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="auth_token_refresh"),
    path("sign-out/", views.LogoutView.as_view(), name="auth_logout"),
]