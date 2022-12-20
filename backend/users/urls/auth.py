"""authentication end points"""

from django.urls import path
from backend.users.views import auth as views
from backend.users.views import refresh as token_views

urlpatterns = [
    path("sign-in/", views.LoginView.as_view(), name="token_obtain_pair"),
    path("refresh/", token_views.CookieTokenRefreshView.as_view(), name="auth_token_refresh"),
    path("sign-out/", views.LogoutView.as_view(), name="auth_logout"),
]