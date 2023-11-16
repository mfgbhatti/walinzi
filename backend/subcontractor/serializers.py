from rest_framework.serializers import ModelSerializer, CharField

from backend.subcontractor.models import Subcontractor


class SubcontractorSerializer(ModelSerializer):
    land_line = CharField(required=False, allow_null=True, allow_blank=True)
    reference = CharField(required=False, allow_blank=True, allow_null=True)
    class Meta:
        model = Subcontractor
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
            "pay_rate",
        )

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            client = request.user.client
        else:
            client = None

        subcontractor = Subcontractor.objects.create(**validated_data)
        subcontractor.client = client
        subcontractor.save()
        return subcontractor
