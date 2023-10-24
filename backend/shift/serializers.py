from rest_framework import serializers

from backend.shift.models import Shift, Timesheet


class TimesheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timesheet
        fields = "__all__"


class ShiftSerializer(serializers.ModelSerializer):
    timesheet = TimesheetSerializer()

    class Meta:
        model = Shift
        fields = (
            "location",
            "time_in",
            "time_out",
            "break_duration",
            "is_active",
            "timesheet",
        )

    def create(self, validated_data):
        timesheet_data = validated_data.pop("timesheet")
        shift = Shift.objects.create(**validated_data)
        timesheet = Timesheet.objects.create(shift=shift, **timesheet_data)

        return shift
