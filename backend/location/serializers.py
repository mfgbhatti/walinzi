from rest_framework import serializers

from backend.location.models import Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"

    """Assuming that customer is  passed in the request"""
