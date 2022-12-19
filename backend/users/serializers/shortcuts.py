"""serializer shortcuts"""
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from ..models import UserShortcuts

class UserShortcutsSerializer(serializers.ModelSerializer):
    """User shortcuts serializer."""

    class Meta:
        """Meta class."""

        model = UserShortcuts
        fields = ("id", "label", "description", "icon", "link", "useRouter")

    def create(self, validated_data):
        """Create a new shortcut."""
        validated_data["user"] = self.context["request"].user
        shortcut = UserShortcuts.objects.create(**validated_data)
        return shortcut

    def update(self, instance, validated_data):
        """Update a shortcut."""
        instance.user = validated_data.get("user", instance.user)
        instance.label = validated_data.get("label", instance.label)
        instance.description = validated_data.get("description", instance.description)
        instance.icon = validated_data.get("icon", instance.icon)
        instance.link = validated_data.get("link", instance.link)
        instance.useRouter = validated_data.get("useRouter", instance.useRouter)
        instance.save()
        return instance

    def retrive(self, instance):
        """Retrieve a shortcut."""
        shortcut = UserShortcuts.objects.get(pk=instance)
        return shortcut

    def destroy(self, instance):
        """Delete a shortcut."""
        shortcut = UserShortcuts.objects.get(pk=instance)
        shortcut.delete()
        return shortcut