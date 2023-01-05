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
    superuser 1
    admin 2
    account 5
    humres 4
    control 3
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

    def get_name(self, obj):
        """get full name of user"""
        return "{} {}".format(obj.first_name, obj.last_name)

    class Meta:
        model = User
        fields = (
            "id",
            "title",
            "customer",
            "username",
            "phone",
            "email",
            "name",
            "first_name",
            "last_name",
            "is_active",
            "avatar",
            "about",
        )


class UpdateUserSerializer(serializers.ModelSerializer):
    """serializer for update user"""

    name = serializers.SerializerMethodField(read_only=True)

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
