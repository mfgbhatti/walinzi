from rest_framework.serializers import ModelSerializer, CharField

from backend.location.models import Location


class LocationSerializer(ModelSerializer):
    mobile = CharField(required=False, allow_null=True, allow_blank=True)
    reference = CharField(required=False, allow_blank=True, allow_null=True)
    customer_name = CharField(source="customer.name")

    class Meta:
        model = Location
        fields = (
            "id",
            "name",
            "mobile",
            "email",
            "land_line",
            "address",
            "post_code",
            "city",
            "is_active",
            "reference",
            "created_at",
            "updated_at",
            "charge_rate",
            "customer",
            "customer_name",
        )

    """Assuming that customer is  passed in the request"""
