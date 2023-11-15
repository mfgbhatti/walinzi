from rest_framework.serializers import ModelSerializer, CharField

from backend.client.models import Client


class ClientSerializer(ModelSerializer):
    mobile = CharField(required=False, allow_null=True, allow_blank=True)
    reference = CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Client
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
        )
