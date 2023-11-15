from rest_framework.serializers import ModelSerializer, CharField, EmailField

from backend.customer.models import Customer
from backend.location.models import Location


class LocationSerializer(ModelSerializer):
    mobile = CharField(required=False, allow_null=True, allow_blank=True)
    reference = CharField(required=False, allow_blank=True, allow_null=True)
    customer_name = CharField(
        source="customer.name", required=False, allow_blank=True, allow_null=True
    )
    customer_id = CharField(
        source="customer.id"
    )
    land_line = CharField(required=False, allow_blank=True, allow_null=True)
    email = EmailField(required=False, allow_blank=True, allow_null=True)

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
            "customer_id",
            "customer_name",
        )

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            client = request.user.client
        else:
            client = None
        customer_data = validated_data.pop("customer_id")
        # customer_name = validated_data.pop("customer_name")
        if customer_data is not None:
            customer = Customer.objects.get(id=customer_data)
            if customer is not None and customer.client == client:
                new_location = Location.objects.create(
                    customer=customer, **validated_data
                )
                return new_location
            
        return None

    # def update(self, instance, validated_data):
    #     user = None
    #     request = self.context.get("request")
    #     if request and hasattr(request, "user"):
    #         client = request.user.client
    #     else:
    #         client = None
    #     customer_data = validated_data.pop("customer")
    #     customer_name = validated_data.pop("customer_name")
    #
    #     instance.name = validated_data.get("name", instance.name)
    #     instance.email = validated_data.get("email", instance.email)
    #     instance.mobile = validated_data.get("mobile", instance.mobile)
    #     instance.land_line = validated_data.get("land_line", instance.land_line)
    #     instance.address = validated_data.get("address", instance.address)
    #     instance.city = validated_data.get("city", instance.city)
    #     instance.post_code = validated_data.get("post_code", instance.post_code)
    #     instance.is_active = validated_data.get("is_active", instance.is_active)
    #     instance.reference = validated_data.get("reference", instance.reference)
    #     instance.charge_rate = validated_data.get("charge_rate", instance.charge_rate)
    #     if customer_data is not None:
    #         customer = Customer.objects.get(id=customer_data)
    #         if customer is not None and customer.client == client:
    #             instance.customer = customer
    #             instance.save()
    #     else:
    #         return None
    #     instance.save()
    #
    #     return instance
