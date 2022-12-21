"""views for configs"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from ..models import AppConfig
from ..serializers import AppConfigSerializer

class AppConfigViewSet(viewsets.ModelViewSet):
    """App config view set."""

    queryset = AppConfig.objects.all()
    serializer_class = AppConfigSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Return queryset."""
        return self.queryset.filter(user=self.request.user)
    