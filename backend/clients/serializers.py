from rest_framework import serializers
from clients.models import Client, Note, PhoneNumber, Email


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"


class PhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneNumber
        fields = "__all__"


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = "__all__"


class ClientSerializer(serializers.ModelSerializer):
    phone_numbers = PhoneNumberSerializer(many=True)
    emails = EmailSerializer(many=True)
    notes = NoteSerializer(many=True)

    class Meta:
        model = Client
        fields = "__all__"

    def create(self, validated_data):
        phone_numbers = validated_data.pop('phone_numbers')
        emails = validated_data.pop('emails')
        notes = validated_data.pop('notes')
        client_instance = Client.objects.create(**validated_data)
        for number in phone_numbers:
            PhoneNumber.objects.create(client=client_instance, **number)
        for email in emails:
            Email.objects.create(client=client_instance, **email)
        for note in notes:
            Note.objects.create(client=client_instance, **note)
        return client_instance

