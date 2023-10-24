from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from backend.staff.models import Staff
from backend.staff.serializers import StaffSerializer


class StaffViewSet(ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_client = (
            self.request.user.client
        )  # Assuming user's client is associated with the user object
        return Staff.objects.filter(client=user_client)
