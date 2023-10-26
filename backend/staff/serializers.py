from rest_framework.serializers import ModelSerializer

from backend.staff.models import Staff
from backend.shift.models import Shift, Timesheet


class StaffSerializer(ModelSerializer):
    class Meta:
        model = Staff
        fields = "__all__"

    """Assuming that customer is  passed in the request"""


class StaffShiftSerializer(ModelSerializer):
    class Meta:
        model = Shift
        fields = "__all__"


class StaffTimesheetSerializer(ModelSerializer):
    # only single shift is supported
    shift = StaffShiftSerializer()

    class Meta:
        model = Timesheet
        fields = (
            "id",
            "staff",
            "shift_date",
            "duration",
            "notes",
            "shift",
        )
