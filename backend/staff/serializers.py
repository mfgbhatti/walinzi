from rest_framework.serializers import ModelSerializer, SerializerMethodField, ValidationError

from backend.shift.models import Shift, Timesheet
# from backend.subcontractor.models import Subcontractor
from backend.staff.models import Staff


class StaffSerializer(ModelSerializer):
    # subcontractor_name = CharField(source="subcontractor.name", required=False, allow_null=True, allow_blank=True)
    subcontractor_name = SerializerMethodField()

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

    def get_subcontractor_name(self, obj):
        if obj.subcontractor:
            return obj.subcontractor.name
        else:
            return None

    def validate(self, data):
        # Add custom validation logic here
        user_client = self.context["request"].user.client
        subcontractor_client = data["subcontractor"].client

        if user_client != subcontractor_client:
            raise ValidationError("Service temporarily unavailable, try again later.")
        return data

    # def create(self, validated_data):
    #     user = None
    #     request = self.context.get("request")
    #     if request and hasattr(request, "user"):
    #         client = request.user.client
    #     else:
    #         client = None
    #     subcontractor_data = validated_data.pop("subcontractor")
    #     subcontractor = Subcontractor.objects.get(pk=subcontractor_data.id)
    #     if client is not None and subcontractor.client == client:
    #         new_staff = Staff.objects.create(client=client, subcontractor=subcontractor, **validated_data)
    #         return new_staff
    #     return None
    #
    # #     needs update function
    # def update(self, instance, validated_data):
    #     user = None
    #     request = self.context.get("request")
    #     if request and hasattr(request, "user"):
    #         client = request.user.client
    #     else:
    #         client = None
    #     # subcontractor_data = validated_data.pop("subcontractor")
    #     instance.first_name = validated_data.get("first_name", instance.first_name)
    #     instance.last_name = validated_data.get("last_name", instance.last_name)
    #     instance.display_name = validated_data.get("display_name", instance.display_name)
    #     instance.is_active = validated_data.get("is_active", instance.is_active)
    #     instance.pay_rate = validated_data.get("pay_rate", instance.pay_rate)
    #     instance.subcontractor = validated_data.get("subcontractor", instance.subcontractor)
    #     instance.save()
    #     return instance


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
