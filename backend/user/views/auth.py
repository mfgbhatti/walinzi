"""adding views to authentication"""
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import views, status
from rest_framework.response import Response
import datetime

from backend.user.serializers import LoginSerializer, UserSerializer


class LogoutView(views.APIView):
    """logout"""

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    """login"""

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        """manipulating user login"""

        def get_tokens_for_user(user_id):
            """getting tokens for user"""
            refresh = RefreshToken.for_user(user_id)

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
        serializer = UserSerializer(user)
        login(request, user)
        response = Response(
            data={"ACCESS": tokens["access"], "user": serializer.data},
            status=status.HTTP_202_ACCEPTED,
        )
        expiry = datetime.datetime.now() + datetime.timedelta(days=1)
        response.set_cookie(
            key="REFRESH",
            value=tokens["refresh"],
            httponly=True,
            expires=expiry,
            secure=False,
            samesite=None,
        )

        return response
