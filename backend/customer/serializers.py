from rest_framework import serializers

from backend.customer.models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            client_id = user.client_id
        else:
            client_id = None

        customer = Customer.objects.create(**validated_data)
        customer.client = client_id
        customer.save()
        return customer
