from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from backend.staff.models import Staff
from backend.staff.serializers import StaffSerializer
from backend.shift.serializers import TimesheetSerializer
from backend.shift.models import Timesheet


class StaffViewSet(ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_client = (
            self.request.user.client
        )  # Assuming user's client is associated with the user object
        return Staff.objects.filter(client=user_client)

class StaffTimesheetViewSet(ModelViewSet):
    queryset = Timesheet.objects.all()
    serializer_class = TimesheetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        staff_id = self.request.query_params.get("staff_id")
        return Timesheet.objects.filter(staff=staff_id)