"""Navigation serializers."""
from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField

from .models import Navigation

class NavigationSerializer(serializers.ModelSerializer):
    """Navigation serializer."""

    exactMatch = serializers.BooleanField(source="exact_match", read_only=True)
    class Meta:
        """Meta class."""
        model = Navigation
        fields = [
            "id",
            "type",
            "title",
            "icon",
            "link",
            "exactMatch",
            "classes",
            "badge",
            "children",
            # "main",
            # "hidden",
            # "active",
            # "disabled",
            # "tooltip",
            # "fragment",
            # "preserveFragment",
            # "externalLink",
            # "target",
            # "meta",
        ]

class NavigationSerializer(serializers.ModelSerializer):
    """Navigation serializer."""

    exactMatch = serializers.BooleanField(source="exact_match", read_only=True)
    # children = RecursiveField(many=True, read_only=True)

    children = NavigationSerializer(many=True, read_only=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['children'] = self.fields['children'].to_representation(instance.children.all())
        return representation
    class Meta:
        """Meta class."""

        # depth = 1
        model = Navigation
        fields = [
            "id",
            "type",
            "title",
            "subtitle",
            "icon",
            "link",
            "exactMatch",
            "classes",
            "badge",
            "children",
            # "main",
            # "hidden",
            # "active",
            # "disabled",
            # "tooltip",
            # "fragment",
            # "preserveFragment",
            # "externalLink",
            # "target",
            # "meta",
        ]


# from .models import (
#     MainNavigation,
#     ChildNavigation,
#     ChildNavigationBadge,
#     ChildNavigationClass,
# )


# class ChildNavigationBadgeSerializer(serializers.ModelSerializer):
#     """Child navigation badge serializer."""

#     class Meta:
#         """Meta class."""

#         model = ChildNavigationBadge
#         fields = ("classes", "title")


# class ChildNavigationClassSerializer(serializers.ModelSerializer):
#     """Child navigation class serializer."""

#     class Meta:
#         """Meta class."""

#         model = ChildNavigationClass
#         fields = ("title", "subtitle", "icon", "wrapper")


# class ChildNavigationSerializer(serializers.ModelSerializer):
#     """Child navigation serializer."""

#     classes = ChildNavigationClassSerializer()
#     badge = ChildNavigationBadgeSerializer()

#     class Meta:
#         """Meta class."""

#         model = ChildNavigation
#         fields = [
#             "id",
#             "type",
#             "title",
#             # "main",
#             # "hidden",
#             # "active",
#             "icon",
#             # "disabled",
#             # "tooltip",
#             "link",
#             # "fragment",
#             # "preserveFragment",
#             # "externalLink",
#             # "target",
#             "exactMatch",
#             # "meta",
#             "classes",
#             "badge",
#         ]


# class NavigationSerializer(serializers.ModelSerializer):
#     """Navigation serializer."""

#     children = ChildNavigationSerializer(many=True)

#     class Meta:
#         """Meta class."""

#         model = MainNavigation
#         fields = ("id", "title", "icon", "subtitle", "type", "children",)
