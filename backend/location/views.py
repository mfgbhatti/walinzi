from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from backend.location.models import Location
from backend.location.serializers import LocationSerializer


class LocationViewSet(ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_client = (
            self.request.user.client
        )  # Assuming user's client is associated with the user object
        return Location.objects.filter(customer__client=user_client)

    @action(detail=False, methods=["get"])
    def by_customer(self, request, pk=None):
        locations = Location.objects.filter(customer_id=pk)
        serializer = self.get_serializer(locations, many=True)
        return Response(serializer.data)
