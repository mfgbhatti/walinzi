"""serializers for user model"""
from django.contrib.auth import get_user_model as UserModel
from rest_framework import serializers

from backend.users.models import BaseUser as User


class UserListSerializer(serializers.ModelSerializer):
    """serializer for user list"""

    name = serializers.SerializerMethodField(read_only=True)
    status = serializers.SerializerMethodField(read_only=True)
    customer = serializers.CharField(source="customer.name", read_only=True)

    def get_name(self, obj):
        """get full name of user"""
        return "{} {}".format(obj.first_name, obj.last_name)

    def get_status(self, obj):
        """get status of user"""
        return obj.is_active

    class Meta:
        model = User
        fields = (
            "id",
            "customer",
            "username",
            "about",
            "title",
            "phone",
            "email",
            "name",
            "avatar",
            "status",
        )


class UserSerializer(serializers.ModelSerializer):
    """serializer for user"""

    name = serializers.SerializerMethodField(read_only=True)
    status = serializers.SerializerMethodField(read_only=True)
    customer = serializers.CharField(source="customer.name", read_only=True)

    def get_name(self, obj):
        """get full name of user"""
        return "{} {}".format(obj.first_name, obj.last_name)

    def get_status(self, obj):
        """get status of user"""
        return obj.is_active

    class Meta:
        model = User
        fields = (
            "id",
            "title",
            "customer",
            "phone",
            "email",
            "name",
            "avatar",
            "status",
            "is_superuser",
            "about",
        )
