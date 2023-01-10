"""
viewsets for the client app
"""
from rest_framework import viewsets, status
from rest_framework.response import Response
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

class SearchClientByNameView(viewsets.ModelViewSet):
    """Search client by name viewset."""

    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = (IsAuthenticated,)

    def retrieve(self, request, *args, **kwargs):
        """Get queryset."""
        user = request.user
        name = self.request.query_params.get("query")
        print(kwargs)
        return self.queryset.filter(owned_by=user.customer, name__icontains=name)