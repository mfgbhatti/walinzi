"""adding views to authentication"""
from django.contrib.auth import login, logout
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import views, status
from rest_framework.response import Response
import datetime

from ..serializers import LoginSerializer


class LogoutView(views.APIView):
    """logout"""

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            logout(request)

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


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

        serializer = LoginSerializer(data=self.request.data, context={"request": self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        tokens = get_tokens_for_user(user)
        login(request, user)
        response = Response(data={"access": tokens["access"]}, status=status.HTTP_202_ACCEPTED)
        expiry = datetime.datetime.now() + datetime.timedelta(days=1)
        response.set_cookie(
            key="refresh", value=tokens["refresh"], httponly=True, expires=expiry, secure=False, samesite=None
        )

        return response