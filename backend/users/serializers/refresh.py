"""Token serializers."""
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        """token names in angular are accessToken and refreshToken"""
        attrs["refresh"] = self.context["request"].COOKIES.get("refreshToken")
        if attrs["refresh"]:
            return super().validate(attrs)
        else:
            raise InvalidToken("No valid token found in cookie 'refreshToken'")
