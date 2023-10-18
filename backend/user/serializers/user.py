from rest_framework import serializers
from backend.user.models import MyBaseUser as User
from backend.user.utils import generate_activation_key, is_activation_key_valid


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)

    def create(self, validated_data):
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
        user.activation_link = f"/user/activate/{user.id}/{activation_key}"
        user.client = client_id
        user.save()
        return user


class SetUserPasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ("password",)
