from rest_framework.serializers import ModelSerializer, CharField

from backend.shift.models import Shift, Timesheet
from backend.subcontractor.models import Subcontractor
from backend.staff.models import Staff


class StaffSerializer(ModelSerializer):
    subcontractor_name = CharField(source="subcontractor.name",required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Staff
        fields = (
            "id",
            "first_name",
            "last_name",
            "display_name",
            "subcontractor",
            "subcontractor_name",
            "pay_rate",
            "is_active",
        )

    """Assuming that customer is  passed in the request"""

    def create(self, validated_data):
        print(validated_data)
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            client = request.user.client
        else:
            client = None
        subcontractor = validated_data.pop("subcontractor")
        if client is not None:
            new_staff = Staff.objects.create(client=client, **validated_data)
            if subcontractor is not None:
                # need id to get data from
                _subcontractor = Subcontractor.objects.get(id=subcontractor.id)
                new_staff.subcontractor = _subcontractor
            return new_staff
        return None

#     needs update function


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
