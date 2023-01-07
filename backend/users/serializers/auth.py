"""auth serializer"""
from django.contrib.auth import authenticate

from rest_framework import serializers

from backend.users.models import BaseUser as User


class LoginSerializer(serializers.Serializer):
    """
    This serializer defines two fields for authentication:
      * email
      * password.
    It will try to authenticate the user with when validated.
    """

    email = serializers.CharField(write_only=True)
    password = serializers.CharField(trim_whitespace=False, write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = authenticate(request=self.context.get("request"), email=email, password=password)

            if not user:
                msg = "Access denied: wrong email or password."
                raise serializers.ValidationError(msg, code="authorization")
        else:
            msg = 'Both "email" and "password" are required.'
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    """Reset password serializer"""

    oldPassword = serializers.CharField(write_only=True)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate(self, attrs):
        old_password = attrs.get("oldPassword")
        password1 = attrs.get("password1")
        password2 = attrs.get("password2")
        user = self.context.get("user")

        if not user.check_password(old_password):
            msg = "Old password is incorrect"
            raise serializers.ValidationError(msg, code="authorization")

        if password1 != password2:
            msg = "Passwords do not match"
            raise serializers.ValidationError(msg, code="authorization")

        return attrs
