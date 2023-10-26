from rest_framework.serializers import ModelSerializer

from backend.customer.models import Customer


class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"

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
