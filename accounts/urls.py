"""
Authentication urls
"""

from django.urls import path
from django.contrib.auth import views as auth_views

from accounts.forms import LoginForm
from accounts.views import CreateUserView, ActivateUserView


# from accounts.views import Authencate
app_name = "accounts"

urlpatterns = [
    path(
        "login/", auth_views.LoginView.as_view(template_name="accounts/login.html", form_class=LoginForm), name="login"
    ),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),
    path("create_user/<uuid:customer_id>/", CreateUserView, name="create_user"),
    path("activate/<uuid:pk>/<key>/", ActivateUserView, name="activate_user"),
]
