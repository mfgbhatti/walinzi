"""serializers for configs"""

from rest_framework import serializers

from ..models import AppConfig


class AppConfigSerializer(serializers.ModelSerializer):
    """App config serializer."""

    class Meta:
        """Meta class."""

        model = AppConfig
        fields = ("layout", "scheme", "theme")

    def create(self, validated_data):
        """Create a new user config."""
        validated_data["user"] = self.context["request"].user
        return AppConfig.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update user config."""
        instance.user = validated_data.get("user", instance.user)
        instance.layout = validated_data.get("layout", instance.layout)
        instance.scheme = validated_data.get("scheme", instance.scheme)
        instance.theme = validated_data.get("theme", instance.theme)
        instance.save()
        return instance