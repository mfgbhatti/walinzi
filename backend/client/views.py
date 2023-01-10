"""
viewsets for the client app
"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from backend.client.models import Client
from backend.client.serializers import ClientSerializer, CreateClientSerializer

class ClientViewSet(viewsets.ModelViewSet):
    """Client viewset."""

    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Get queryset."""
        user = self.request.user
        return self.queryset.filter(owned_by=user.customer)

class CreateClientViewSet(viewsets.ModelViewSet):
    """Create client viewset."""

    queryset = Client.objects.all()
    serializer_class = CreateClientSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Get queryset."""
        user = self.request.user
        return self.queryset.filter(owned_by=user.customer)
