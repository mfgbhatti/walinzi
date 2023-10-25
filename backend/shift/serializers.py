from rest_framework import serializers

from backend.shift.models import Shift, Timesheet


class TimesheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timesheet
        fields = ("id", "staff", "shift", "shift_date", "duration", "notes")


class ShiftSerializer(serializers.ModelSerializer):
    # need many=True when ForeignKey is used
    timesheet = TimesheetSerializer(many=True)

    class Meta:
        model = Shift
        fields = (
            "id",
            "location",
            "time_in",
            "time_out",
            "break_duration",
            "is_active",
            "timesheet",
        )

    def create(self, validated_data):
        timesheet_data = validated_data.pop("timesheet")
        new_shift = Shift.objects.create(**validated_data)
        timesheet = Timesheet.objects.create(shift=new_shift, **timesheet_data)
        timesheet.duration = new_shift.duration()
        timesheet.date = new_shift.time_in.date()
        timesheet.save()

        return new_shift

    def get_timesheet(self):
        return TimesheetSerializer().data
