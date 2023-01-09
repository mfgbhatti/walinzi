"""
viewsets for the client app
"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from backend.client.models import Client
from backend.client.serializers import ClientSerializer

class ClientViewSet(viewsets.ModelViewSet):
    """Client viewset."""

    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Get queryset."""
        user = self.request.user
        return self.queryset.filter(owned_by=user.customer)

    # def create(self, serializer):
    #     """Create client."""
    #     user = self.request.user
    #     customer = user.customer
    #     detail_data = serializer.validated_data.pop("detail")
    #     address_data = serializer.validated_data.pop("address")
    #     phone_data = detail_data.pop("phoneNumbers")
    #     email_data = detail_data.pop("emails")
    #     note_data = detail_data.pop("notes")
    #     client = Client.objects.create(**serializer.validated_data)
    #     client.owned_by = customer
    #     client.created_by = user
    #     client.save()
    #     serializer.save(owned_by=user.customer, created_by=user)