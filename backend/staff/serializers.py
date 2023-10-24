from rest_framework import serializers

from backend.staff.models import Staff


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = "__all__"

    """Assuming that customer is  passed in the request"""
