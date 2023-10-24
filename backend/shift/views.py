from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from backend.shift.models import Shift
from backend.shift.serializers import ShiftSerializer


class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_client = (
            self.request.user.client
        )  # Assuming user's client is associated with the user object
        return Shift.objects.filter(location__customer__client=user_client)
