from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from config.settings.base import SIMPLE_JWT

from backend.user.serializers import CookieTokenRefreshSerializer, LoginSerializer


def set_cookie_up(response, cookie_data):
    if response.data.get("refresh"):
        response.set_cookie(
            "refresh_token",
            cookie_data,
            max_age=SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
            httponly=SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            secure=SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            samesite=SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )
        del response.data["refresh"]


class LogoutView(APIView):
    """logout"""

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            response = Response(
                status=status.HTTP_205_RESET_CONTENT, data={"success": True}
            )
            response.delete_cookie(key="refresh_token")
            return response
        except Exception as e:
            response = Response(
                status=status.HTTP_400_BAD_REQUEST, data={"success": False}
            )
            return response


class CookieTokenObtainPairView(TokenObtainPairView):
    def finalize_response(self, request, response, *args, **kwargs):
        set_cookie_up(response=response, cookie_data=response.data["refresh"])
        return super().finalize_response(request, response, *args, **kwargs)

    serializer_class = LoginSerializer


class CookieTokenRefreshView(TokenRefreshView):
    # def finalize_response(self, request, response, *args, **kwargs):
    #     set_cookie_up(response=response, cookie_data=response.data["refresh"])
    #     # if response.data.get("refresh"):
    #     #     response.set_cookie(
    #     #         "refresh_token",
    #     #         response.data["refresh"],
    #     #         max_age=SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"],
    #     #         httponly=SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
    #     #         secure=SIMPLE_JWT["AUTH_COOKIE_SECURE"],
    #     #         samesite=SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
    #     #     )
    #     #     del response.data["refresh"]
    #     return super().finalize_response(request, response, *args, **kwargs)

    serializer_class = CookieTokenRefreshSerializer
