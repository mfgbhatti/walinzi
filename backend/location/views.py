from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from backend.location.models import Location
from backend.location.serializers import LocationSerializer


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]
