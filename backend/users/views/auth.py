"""adding views to authentication"""
from django.contrib.auth import login, logout
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import views, status
from rest_framework.response import Response
import datetime

from backend.users.serializers.auth import LoginSerializer
from backend.users.serializers.user import UserSerializer


class LoginView(views.APIView):
    """login"""

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        """manipulating user login"""

        def get_tokens_for_user(user):
            """getting tockens for user"""
            refresh = RefreshToken.for_user(user)

            return {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }

        serializer = LoginSerializer(
            data=self.request.data, context={"request": self.request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        tokens = get_tokens_for_user(user)
        login(request, user)
        """token names in angular are accessToken and refreshToken"""
        user_serializer = UserSerializer(user)
        response = Response(
            data={"accessToken": tokens["access"], "user": user_serializer.data}, status=status.HTTP_202_ACCEPTED
        )
        cookie_max_age = datetime.datetime.now() + datetime.timedelta(hours=1)
        response.set_cookie(
            key="refreshToken",
            value=tokens["refresh"],
            httponly=True,
            expires=cookie_max_age,
            secure=False,
            samesite=None,
        )

        return response


class LogoutView(views.APIView):
    """logout"""

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        """token names in angular are accessToken and refreshToken"""
        if "refreshToken" in request.COOKIES:
            refresh_token = request.COOKIES.get('refreshToken')
            token = RefreshToken(refresh_token)
            token.blacklist()
            logout(request)
            response = Response(status=status.HTTP_204_NO_CONTENT)
            response.delete_cookie('refreshToken')
            return response
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

