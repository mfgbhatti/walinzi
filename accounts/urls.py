"""
Authentication urls
"""

from django.urls import path

# from django.contrib.auth import views as auth_views

from accounts.views import user_list_view, activate_user_view, UserLoginView, UserLogoutView, profile_view, \
    update_profile_view, change_password_view

# from accounts.views import Authenticate
app_name = "accounts"

urlpatterns = [
    # path( "login/", auth_views.LoginView.as_view(template_name="accounts/login.html", form_class=LoginForm),
    # name="login" ), path("logout/", auth_views.LogoutView.as_view(), name="logout"),
    path("profile/", profile_view, name="user_profile"),
    path("login/", UserLoginView.as_view(), name="user_login"),
    path("logout/", UserLogoutView.as_view(), name="user_logout"),
    path("users_list/<uuid:customer_id>/", user_list_view, name="user_list"),
    path("activate/<uuid:pk>/<key>/", activate_user_view, name="activate_user"),
    path("update_profile/", update_profile_view, name="update_profile"),
    path("change_password/", change_password_view, name="change_password")
]
