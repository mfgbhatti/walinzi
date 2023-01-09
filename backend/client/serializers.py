"""Client serializers."""
from rest_framework import serializers

from backend.customers.models import Customer
from backend.users.models import BaseUser as User

from .models import (
    Client,
    ClientAddress,
    ClientDetail,
    ClientEmail,
    ClientPhone,
    ClientNotes,
)


class ClientNotesSerializer(serializers.ModelSerializer):
    """Client notes serializer."""

    class Meta:
        """short description of the class"""

        model = ClientNotes
        fields = ("note", "label")


class ClientPhoneSerializer(serializers.ModelSerializer):
    """Client phone serializer."""

    class Meta:
        """short description of the class"""

        model = ClientPhone
        fields = (
            "phone",
            "label",
        )


class ClientEmailSerializer(serializers.ModelSerializer):
    """Client email serializer."""

    class Meta:
        """short description of the class"""

        model = ClientEmail
        fields = ("email", "label")


class ClientAddressSerializer(serializers.ModelSerializer):
    """Client address serializer."""

    class Meta:
        """short description of the class"""

        model = ClientAddress
        fields = ("street", "city", "post_code")


class ClientDetailSerializer(serializers.ModelSerializer):
    """Client detail serializer."""

    phoneNumbers = ClientPhoneSerializer(many=True)
    emails = ClientEmailSerializer(many=True)
    notes = ClientNotesSerializer(many=True)

    class Meta:
        """short description of the class"""

        model = ClientDetail
        fields = (
            "website",
            "vat_number",
            "phoneNumbers",
            "emails",
            "notes",
        )


class ClientListSerializer(serializers.ModelSerializer):
    """just customesr list serializer."""

    class Meta:
        """short description of the class"""

        model = Client
        fields = (
            "id",
            "name",
        )


class ClientSerializer(serializers.ModelSerializer):
    """Client serializer."""

    detail = ClientDetailSerializer()
    address = ClientAddressSerializer()

    class Meta:
        """short description of the class"""

        model = Client
        fields = (
            "id",
            "name",
            "address",
            "detail",
        )

    def create(self, validated_data):
        """Create client."""
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user

        instance = Customer.objects.get(id=user.customer.id)
        user_instance = User.objects.get(id=user.id)

        validated_data["updated_by"] = user_instance
        detail_data = validated_data.pop("detail")
        address_data = validated_data.pop("address")
        phone_data = detail_data.pop("phoneNumbers")
        email_data = detail_data.pop("emails")
        note_data = detail_data.pop("notes")
        client = Client.objects.create(owned_by=instance, created_by=user_instance, **validated_data)
        ClientAddress.objects.create(client=client, **address_data)
        client_detail = ClientDetail.objects.create(client=client, **detail_data)

        for item in phone_data:
            ClientPhone.objects.create(detail=client_detail, **item)
        for item in email_data:
            ClientEmail.objects.create(detail=client_detail, **item)
        for item in note_data:
            ClientNotes.objects.create(detail=client_detail, **item)

        # client.created_by = user.id
        return client

    def update(self, instance, validated_data):
        """Update client."""
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        user_instance = User.objects.get(id=user.id)
        detail_data = validated_data.pop("detail")
        address_data = validated_data.pop("address")
        phone_data = detail_data.pop("phoneNumbers")
        email_data = detail_data.pop("emails")
        note_data = detail_data.pop("notes")

        instance.name = validated_data.get("name", instance.name)
        instance.updated_by = user_instance

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
        detail.vat_number = detail_data.get("vat_number", detail.vat_number)
        detail.save()

        def update_array(model_data, STRING, MODEL):
            # change detail to instance and add that instance in parameters
            # detail=detail.pk to detail=instance.pk
            # MODEL.objects.create(detail=detail to MODEL.objects.create(detail=instance

            item_with_detail_id = MODEL.objects.filter(detail=detail.pk).values_list("id", flat=True)
            id_pool = []
            for item in model_data:
                if "id" in item.keys():
                    if MODEL.objects.filter(id=item["id"]).exists():
                        item_instance = MODEL.objects.get(id=item["id"])
                        item_instance.STRING = item.get(STRING, item_instance.STRING)
                        item_instance.label = item.get("label", item_instance.label)
                        item_instance.save()
                        id_pool.append(item_instance.id)
                    else:
                        continue
                else:
                    item_instance = MODEL.objects.create(detail=detail, **item)
                    id_pool.append(item_instance.id)

            for item_id in item_with_detail_id:
                if item_id not in id_pool:
                    MODEL.objects.filter(pk=item_id).delete()

        """for arrays like phones, emails, notes"""
        update_array(phone_data, "phone", ClientPhone)
        update_array(email_data, "email", ClientEmail)
        update_array(note_data, "note", ClientNotes)

        return instance
