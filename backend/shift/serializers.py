from rest_framework import serializers

from backend.shift.models import Shift, Timesheet


class TimesheetSerializer(serializers.ModelSerializer):
    # need to explicitly tell the serializer to send id
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Timesheet
        fields = (
            "id",
            "staff",
            "shift",
            "shift_date",
            "duration",
            "notes",
        )


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
        """ implement for loop"""
        for item in timesheet_data:
            timesheet = Timesheet.objects.create(shift=new_shift, **item)
            timesheet.duration = new_shift.duration()
            timesheet.shift_date = new_shift.time_in.date()
            timesheet.save()

        return new_shift

    def update(self, instance, validated_data):
        timesheet_data = validated_data.pop("timesheet")
        instance.location = validated_data.get("location", instance.location)
        instance.time_in = validated_data.get("time_in", instance.time_in)
        instance.time_out = validated_data.get("time_out", instance.time_out)
        instance.break_duration = validated_data.get(
            "break_duration", instance.break_duration
        )
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.save()

        item_with_shift_id = Timesheet.objects.filter(shift=instance.pk).values_list(
            "id", flat=True
        )
        id_pool = []

        for item in timesheet_data:
            if "id" in item.keys():
                item_instance = Timesheet.objects.get(id=item.get("id"))
                if item_instance is not None:
                    item_instance.staff = item.get("staff", item_instance.staff)
                    item_instance.duration = item.get(
                        "duration", item_instance.duration
                    )
                    item_instance.notes = item.get("notes", item_instance.notes)
                    item_instance.shift_date = item.get(
                        "shift_date", item_instance.shift_date
                    )

                    item_instance.save()
                    id_pool.append(item_instance.id)
                else:
                    continue
            else:
                item_instance = Timesheet.objects.create(shift=instance, **item)
                id_pool.append(item_instance.id)

        for item_id in item_with_shift_id:
            if item_id not in id_pool:
                Timesheet.objects.filter(pk=item_id).delete()

        return instance
