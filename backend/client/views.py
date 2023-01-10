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


    def get_queryset(self):
        """Get queryset."""
        user = self.request.user
        return Client.objects.filter(owned_by=user.customer)

    def retrive(self, request, *args, **kwargs):
        """Get queryset."""
        name = self.request.query_params.get("query")
        try:
            client = Client.objects.filter(name__icontains=name)
            serializer = ClientSerializer(client, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Client.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND,)
