from rest_framework.serializers import ModelSerializer, CharField

from backend.customer.models import Customer


class CustomerSerializer(ModelSerializer):
    mobile = CharField(required=False, allow_null=True, allow_blank=True)
    reference = CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Customer
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
        )

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            client = request.user.client
        else:
            client = None

        customer = Customer.objects.create(**validated_data)
        customer.client = client
        customer.save()
        return customer

    def update(self, instance, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        instance.name = validated_data.get("name", instance.name)
        instance.email = validated_data.get("email", instance.email)
        instance.mobile = validated_data.get("mobile", instance.mobile)
        instance.land_line = validated_data.get("land_line", instance.land_line)
        instance.address = validated_data.get("address", instance.address)
        instance.city = validated_data.get("city", instance.city)
        instance.post_code = validated_data.get("post_code", instance.post_code)
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.reference = validated_data.get("reference", instance.reference)
        instance.charge_rate = validated_data.get("charge_rate", instance.charge_rate)
        instance.save()

        return instance
