"""Token views."""
import datetime
from rest_framework_simplejwt.views import TokenRefreshView

from backend.users.serializers.refresh import CookieTokenRefreshSerializer


class CookieTokenRefreshView(TokenRefreshView):
    """token names in angular are accessToken and refreshToken"""

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            cookie_max_age = datetime.datetime.now() + datetime.timedelta(hours=1)
            response.set_cookie("refreshToken", response.data["refresh"], max_age=cookie_max_age, httponly=True)
            del response.data["refresh"]

        # Change the key name from "access" to "accessToken"
        if response.data.get("access"):
            response.data["accessToken"] = response.data["access"]
            del response.data["access"]
        return super().finalize_response(request, response, *args, **kwargs)

    serializer_class = CookieTokenRefreshSerializer
