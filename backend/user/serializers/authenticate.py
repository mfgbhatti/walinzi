from rest_framework_simplejwt.serializers import (
    TokenRefreshSerializer,
    TokenObtainPairSerializer,
)
from rest_framework_simplejwt.exceptions import InvalidToken

from backend.user.serializers import UserSerializer


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs["refresh"] = self.context["request"].COOKIES.get("refresh_token")
        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid token found in cookie 'refresh_token'")


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializer(self.user)
        data.update({"user": serializer.data})
        return data

    # """
    # This serializer defines two fields for authentication:
    #   * email
    #   * password.
    # It will try to authenticate the user with when validated.
    # """
    #
    # email = serializers.CharField(label="Email", write_only=True)
    # password = serializers.CharField(
    #     label="password",
    #     style={"input_type": "Password"},
    #     trim_whitespace=False,
    #     write_only=True,
    # )
    #
    # def validate(self, attrs):
    #     email = attrs.get("email")
    #     password = attrs.get("password")
    #
    #     if email and password:
    #         user = authenticate(
    #             request=self.context.get("request"), email=email, password=password
    #         )
    #
    #         if not user:
    #             msg = "Access denied: wrong email or password."
    #             raise serializers.ValidationError(msg, code="authorization")
    #     else:
    #         msg = 'Both "email" and "password" are required.'
    #         raise serializers.ValidationError(msg, code="authorization")
    #
    #     attrs["user"] = user
    #     return attrs
