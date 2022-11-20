"""serializers for clients"""
from rest_framework import serializers
from clients.models import Client, Note, PhoneNumber, Email, ClientDetail, Address


class NoteSerializer(serializers.ModelSerializer):
    """note serializer"""

    class Meta:
        """using django"""

        model = Note
        fields = ("string", "title")


class PhoneNumberSerializer(serializers.ModelSerializer):
    """phone number serializer"""

    class Meta:
        """using django"""

        model = PhoneNumber
        fields = ("string", "title")


class EmailSerializer(serializers.ModelSerializer):
    """email serializer"""

    class Meta:
        """using django"""

        model = Email
        fields = ("string", "title")


class AddressSerializer(serializers.ModelSerializer):
    """address serializer"""

    class Meta:
        """using django"""

        model = Address
        fields = ("street", "city", "post_code")


class ClientDetailSerializer(serializers.ModelSerializer):
    """sub main serializer"""

    address = AddressSerializer()

    class Meta:
        """using django"""

        model = ClientDetail
        fields = ("display_name", "vat", "website", "address", "status")

class JustClientSerializer(serializers.ModelSerializer):
    """returning just cleint and id"""
    class Meta:
        """ just cleint and id"""
        model = Client
        fields = ("id", "name")


class ClientSerializer(serializers.ModelSerializer):
    """main serializer"""

    detail = ClientDetailSerializer()
    phone_numbers = PhoneNumberSerializer(many=True)
    emails = EmailSerializer(many=True)
    notes = NoteSerializer(many=True)

    class Meta:
        """using django"""

        model = Client
        fields = ("id", "name", "detail", "phone_numbers", "emails", "notes")

    def create(self, validated_data):
        detail_data = validated_data.pop("detail")
        address_data = detail_data.pop("address")
        phone_data = validated_data.pop("phone_numbers")
        email_data = validated_data.pop("emails")
        note_data = validated_data.pop("notes")
        profile = Client.objects.create(**validated_data)
        detail = ClientDetail.objects.create(client=profile, **detail_data)
        Address.objects.create(detail=detail, **address_data)
        for item in phone_data:
            PhoneNumber.objects.create(client=profile, **item)
        for item in email_data:
            Email.objects.create(client=profile, **item)
        for item in note_data:
            Note.objects.create(client=profile, **item)
        return profile

    def update(self, instance, validated_data):
        detail_data = validated_data.pop("detail")
        address_data = detail_data.pop("address")

        phone_data = validated_data.pop("phone_numbers")
        email_data = validated_data.pop("emails")
        note_data = validated_data.pop("notes")
        instance.name = validated_data.get("name", instance.name)
        instance.save()

        """detail and address"""
        detail = instance.detail
        address = instance.detail.address
        address.street = address_data.get("street", address.street)
        address.city = address_data.get("city", address.city)
        address.post_code = address_data.get("post_code", address.post_code)
        address.save()

        detail.display_name = detail_data.get("display_name", detail.display_name)
        detail.vat = detail_data.get("vat", detail.vat)
        detail.website = detail_data.get("website", detail.website)
        detail.status = detail_data.get("status", detail.status)
        detail.save()

        def UpdateArray(model_data, instance, MODEL):
            item_with_client_id = MODEL.objects.filter(client=instance.pk).values_list("id", flat=True)
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
                    item_instance = MODEL.objects.create(client=instance, **item)
                    id_pool.append(item_instance.id)

            for item_id in item_with_client_id:
                if item_id not in id_pool:
                    MODEL.objects.filter(pk=item_id).delete()

        UpdateArray(phone_data, instance, PhoneNumber)
        UpdateArray(email_data, instance, Email)
        UpdateArray(note_data, instance, Note)

        return instance
