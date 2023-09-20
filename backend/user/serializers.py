from django.urls import reverse
from rest_framework import serializers
from backend.user.models import MyBaseUser as User
from backend.user.utils import generate_activation_key, is_activation_key_valid


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)

    def create(self, validated_data):
        """TODO: Implement superuser and server side user client assessment"""
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        if user.is_superuser:
            client_id = validated_data.pop("client")
        else:
            client_id = user.client_id
        user = User.objects.create(**validated_data)
        user.save()

        activation_key = generate_activation_key()
        user.activation_key = activation_key
        user.activation_link = reverse(
            "user:activate_user", kwargs={"pk": user.id, "key": activation_key}
        )
        user.client = client_id
        user.save()
        return user


class UserActivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "email",
            "phone",
            "client",
            "activation_key",
            "activation_link",
        )
