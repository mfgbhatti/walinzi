"""serializers for user model"""
from django.contrib.auth.models import Group
from rest_framework import serializers

from backend.users.models import BaseUser as User


class GroupSerializer(serializers.ModelSerializer):
    """serializer for group"""

    class Meta:
        model = Group
        fields = ("id", "name")


class UserListSerializer(serializers.ModelSerializer):
    """serializer for user list"""

    name = serializers.SerializerMethodField(read_only=True)
    status = serializers.SerializerMethodField(read_only=True)
    groups = GroupSerializer(many=True, read_only=True)
    customerId = serializers.CharField(source="customer.id", read_only=True)

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
            "customerId",
            "username",
            "about",
            "title",
            "phone",
            "email",
            "name",
            "avatar",
            "groups",
            "status",
        )


class UserSerializer(serializers.ModelSerializer):
    """serializer for user"""

    name = serializers.SerializerMethodField(read_only=True)
    status = serializers.SerializerMethodField(read_only=True)
    customerName = serializers.CharField(source="customer.name", read_only=True)
    customerId = serializers.CharField(source="customer.id", read_only=True)
    groups = GroupSerializer(many=True, read_only=True)

    def get_name(self, obj):
        """get full name of user"""
        return "{} {}".format(obj.first_name, obj.last_name)

    def get_status(self, obj):
        """get status of user"""
        return obj.is_active

    """
    "groups":{
            "id": 1,
            "name": "superuser"
        },
        {
            "id": 2,
            "name": "accounts"
        },
        {
            "id": 3,
            "name": "admin"
        },
        {
            "id": 4,
            "name": "humres"
        },
        {
            "id": 5,
            "name": "control"
        }
    """

    class Meta:
        model = User
        fields = (
            "id",
            "title",
            "customerName",
            "customerId",
            "phone",
            "email",
            "name",
            "avatar",
            "username",
            "status",
            "groups",
            "about",
        )


class CreateUserSerializer(serializers.ModelSerializer):
    """serializer for create user"""

    name = serializers.SerializerMethodField(read_only=True)
    groups = GroupSerializer(many=True, read_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

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
            "email",
            "name",
            "username",
            "first_name",
            "last_name",
            "is_active",
            "groups",
        )


class UpdateUserSerializer(serializers.ModelSerializer):
    """serializer for update user"""

    name = serializers.SerializerMethodField(read_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

    def get_name(self, obj):
        """get full name of user"""
        return "{} {}".format(obj.first_name, obj.last_name)

    class Meta:
        model = User
        fields = (
            "title",
            "phone",
            "name",
            "first_name",
            "last_name",
            "about",
        )
