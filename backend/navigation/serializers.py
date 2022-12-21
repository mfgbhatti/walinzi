from rest_framework import serializers

from .models import (
    MainNavigation,
    ChildNavigation,
    ChildNavigationBadge,
    ChildNavigationClass,
)


class ChildNavigationBadgeSerializer(serializers.ModelSerializer):
    """Child navigation badge serializer."""

    class Meta:
        """Meta class."""

        model = ChildNavigationBadge
        fields = ("classes", "title")


class ChildNavigationClassSerializer(serializers.ModelSerializer):
    """Child navigation class serializer."""

    class Meta:
        """Meta class."""

        model = ChildNavigationClass
        fields = ("title", "subtitle", "icon", "wrapper")


class ChildNavigationSerializer(serializers.ModelSerializer):
    """Child navigation serializer."""

    classes = ChildNavigationClassSerializer()
    badge = ChildNavigationBadgeSerializer()

    class Meta:
        """Meta class."""

        model = ChildNavigation
        fields = [
            "id",
            "type",
            "title",
            # "main",
            # "hidden",
            # "active",
            "icon",
            # "disabled",
            # "tooltip",
            "link",
            # "fragment",
            # "preserveFragment",
            # "externalLink",
            # "target",
            "exactMatch",
            # "meta",
            "classes",
            "badge",
        ]


class NavigationSerializer(serializers.ModelSerializer):
    """Navigation serializer."""

    children = ChildNavigationSerializer(many=True)

    class Meta:
        """Meta class."""

        model = MainNavigation
        fields = ("id", "title", "icon", "subtitle", "type", "children",)
