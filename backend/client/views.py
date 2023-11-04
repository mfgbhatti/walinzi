from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from backend.client.models import Client
from backend.client.serializers import ClientSerializer


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """ only itimesheet log and shiftf user is superuser """
        user = self.request.user
        if user.is_superuser:
            return Client.objects.all()
        return Client.objects.none()