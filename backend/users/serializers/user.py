"""serializers for user model"""

from rest_framework import serializers

from backend.users.models import BaseUser as User


class UserSerializer(serializers.ModelSerializer):
    """serializer for user model"""

    name = serializers.SerializerMethodField(read_only=True)
    status = serializers.SerializerMethodField(read_only=True)

    def get_customer(self, obj):
        """get customer of user"""
        return obj.customer.name

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
            "username",
            "title",
            "phone",
            "email",
            "name",
            "avatar",
            "status",
        )
