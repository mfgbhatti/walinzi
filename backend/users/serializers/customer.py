from rest_framework import serializers

from backend.users.models.customers import (
    Customer,
    CustomerAddress,
    CustomerDetail,
    CustomerEmail,
    CustomerPhone,
    CustomerNotes,
)


class CustomerNotesSerializer(serializers.ModelSerializer):
    """Customer notes serializer."""

    class Meta:
        """short description of the class"""

        model = CustomerNotes
        fields = ("note", "title")


class CustomerPhoneSerializer(serializers.ModelSerializer):
    """Customer phone serializer."""

    class Meta:
        """short description of the class"""

        model = CustomerPhone
        fields = ("phone", "title")


class CustomerEmailSerializer(serializers.ModelSerializer):
    """Customer email serializer."""

    class Meta:
        """short description of the class"""

        model = CustomerEmail
        fields = ("email", "title")


class CustomerAddressSerializer(serializers.ModelSerializer):
    """Customer address serializer."""

    class Meta:
        """short description of the class"""

        model = CustomerAddress
        fields = ("street", "city", "post_code")


class CustomerDetailSerializer(serializers.ModelSerializer):
    """Customer detail serializer."""

    phones = CustomerPhoneSerializer(many=True)
    emails = CustomerEmailSerializer(many=True)
    notes = CustomerNotesSerializer(many=True)

    class Meta:
        """short description of the class"""

        model = CustomerDetail
        fields = (
            "website",
            "logo",
            "vat_number",
            "phones",
            "emails",
            "notes",
        )


class CustomerListSerializer(serializers.ModelSerializer):
    """just customesr list serializer."""

    class Meta:
        """short description of the class"""

        model = Customer
        fields = (
            "id",
            "name",
        )


class CustomerSerializer(serializers.ModelSerializer):
    """Customer serializer."""

    detail = CustomerDetailSerializer()
    address = CustomerAddressSerializer()

    class Meta:
        """short description of the class"""

        model = Customer
        fields = (
            "id",
            "name",
            "address",
            "detail",
        )

    def create(self, validated_data):
        """Create customer."""
        detail_data = validated_data.pop("detail")
        address_data = validated_data.pop("address")
        phones_data = detail_data.pop("phones")
        emails_data = detail_data.pop("emails")
        notes_data = detail_data.pop("notes")
        customer = Customer.objects.create(**validated_data)
        CustomerAddress.objects.create(customer=customer, **address_data)
        customer_detail = CustomerDetail.objects.create(customer=customer, **detail_data)

        for item in phones_data:
            CustomerPhone.objects.create(detail=customer_detail, **item)
        for item in emails_data:
            CustomerEmail.objects.create(detail=customer_detail, **item)
        for item in notes_data:
            CustomerNotes.objects.create(detail=customer_detail, **item)

        return customer

    def update(self, instance, validated_data):
        """Update customer."""
        detail_data = validated_data.pop("detail")
        address_data = validated_data.pop("address")
        phones_data = detail_data.pop("phones")
        emails_data = detail_data.pop("emails")
        notes_data = detail_data.pop("notes")

        instance.name = validated_data.get("name", instance.name)
        instance.save()

        """for address"""
        address = instance.address
        address.street = address_data.get("street", address.street)
        address.city = address_data.get("city", address.city)
        address.post_code = address_data.get("post_code", address.post_code)
        address.save()

        """for detail"""
        detail = instance.detail
        detail.website = detail_data.get("website", detail.website)
        detail.logo = detail_data.get("logo", detail.logo)
        detail.vat_number = detail_data.get("vat_number", detail.vat_number)
        detail.save()


        def UpdateArray(model_data, instance, MODEL):
            item_with_detail_id = MODEL.objects.filter(detail=instance.pk).values_list("id", flat=True)
            id_pool = []

            for item in model_data:
                if "id" in item.keys():
                    if MODEL.objects.filter(id=item["id"]).exists():
                        item_instance = MODEL.objects.get(id=item["id"])
                        item_instance.string = item.get("string", item_instance.string)
                        item_instance.title = item.get("title", item_instance.title)
                        item_instance.save()
                        id_pool.append(item_instance.id)
                    else:
                        continue
                else:
                    item_instance = MODEL.objects.create(detail=instance, **item)
                    id_pool.append(item_instance.id)

            for item_id in item_with_detail_id:
                if item_id not in id_pool:
                    MODEL.objects.filter(pk=item_id).delete()
        """for arrays like phones, emails, notes"""

        UpdateArray(phones_data, detail, CustomerPhone)
        UpdateArray(emails_data, detail, CustomerEmail)
        UpdateArray(notes_data, detail, CustomerNotes)

        return instance
