"""views for configs"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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
    def list(self, request, *args, **kwargs):
        """List configs."""
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset.first())
        return Response(serializer.data)