from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from backend.client.models import Client
from backend.client.serializers import ClientSerializer


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    authentication_classes = [IsAuthenticated]
