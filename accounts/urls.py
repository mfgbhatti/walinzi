"""
Authentication urls
"""

from django.urls import path
from django.contrib.auth import views as auth_views

from accounts.loginform import LoginForm

# from accounts.views import Authencate

urlpatterns = [
    path(
        "login/", auth_views.LoginView.as_view(template_name="accounts/login.html", form_class=LoginForm), name="login"
    ),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),
]
