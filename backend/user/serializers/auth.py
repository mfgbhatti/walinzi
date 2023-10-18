"""auth serializer"""
from django.contrib.auth import authenticate

from rest_framework import serializers

from backend.user.models import MyBaseUser as User


class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * email
      * password.
    It will try to authenticate the user with when validated.
    """

    email = serializers.CharField(label="Email", write_only=True)
    password = serializers.CharField(
        label="password",
        style={"input_type": "Password"},
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), email=email, password=password
            )

            if not user:
                msg = "Access denied: wrong email or password."
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = 'Both "email" and "password" are required.'
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    """returning user details"""

    model = User
    fields = "__all__"
