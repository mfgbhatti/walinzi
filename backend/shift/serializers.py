from datetime import datetime
from rest_framework.serializers import (ModelSerializer, CharField, SerializerMethodField, IntegerField,
                                        ValidationError, )

from backend.shift.models import Shift, Timesheet, ShiftLog


class ShiftLogSerializer(ModelSerializer):
    class Meta:
        model = ShiftLog
        fields = "__all__"


class TimesheetSerializer(ModelSerializer):
    # need to explicitly tell the serializer to send id
    id = IntegerField(required=False)
    staff_name = SerializerMethodField()

    class Meta:
        model = Timesheet
        # fields = "__all__"
        fields = (
            "id",
            "staff",
            "staff_name",
            "shift",
            "shift_date",
            "duration",
            "notes",
        )

    def get_staff_name(self, obj):
        return f"{obj.staff.display_name}" if obj.staff else ""


class ShiftSerializer(ModelSerializer):
    # need many=True when ForeignKey is used
    timesheet = TimesheetSerializer(many=True)
    shift_log = ShiftLogSerializer(many=True)
    method = CharField(max_length=20, required=False)
    location_name = SerializerMethodField()

    # time_in = SerializerMethodField()
    # time_out = SerializerMethodField()
    # date_in = SerializerMethodField()
    # date_out = SerializerMethodField()

    class Meta:
        model = Shift
        fields = (
            "id",
            "location",
            "location_name",
            "time_in",
            "time_out",
            # "date_in",
            # "date_out",
            "break_duration",
            "method",
            "is_active",
            "timesheet",
            "shift_log",
        )

    def validate(self, data):
        # Add custom validation logic here
        user_client = self.context["request"].user.client
        location_customer_client = data["location"].customer.client

        if user_client != location_customer_client:
            raise ValidationError("Service temporarily unavailable, try again later.")
        return data

    # def get_time_in(self, obj):
    #     if obj.time_in:
    #         return obj.time_in.time()
    #     # else:
    #     #     return None
    #
    # def get_date_in(self, obj):
    #
    #     if obj.time_in:
    #         return obj.time_in.date()
    #     else:
    #         return None
    #
    # def get_time_out(self, obj):
    #
    #     if obj.time_out:
    #         return obj.time_out.time()
    #     else:
    #         return None
    #
    # def get_date_out(self, obj):
    #
    #     if obj.time_out:
    #         return obj.time_out.date()
    #     else:
    #         return None
    #
    def get_location_name(self, obj):
        if obj.location:
            return obj.location.name
        else:
            return None

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        timesheet_data = validated_data.pop("timesheet")
        shift_log = validated_data.pop("shift_log")
        method = validated_data.pop("method")

        date_in = validated_data.pop('date_in')
        time_in = validated_data.pop('time_in')
        date_out = validated_data.pop('date_out')
        time_out = validated_data.pop('time_out')

        validated_data['time_in'] = datetime.combine(date_in, time_in)
        validated_data['time_out'] = datetime.combine(date_out, time_out)

        new_shift = Shift.objects.create(**validated_data)
        """ implement for loop"""

        def save_data(model, unit, action=None):
            data_instance = model.objects.create(shift=new_shift, **unit)
            data_instance.duration = new_shift.duration()
            data_instance.shift_date = new_shift.time_in.date()
            if action:
                data_instance.user = user
                data_instance.action = method
            data_instance.save()

        for item in timesheet_data:
            save_data(model=Timesheet, unit=item)
            save_data(model=ShiftLog, unit=item, action=True)

        return new_shift

    def update(self, instance, validated_data):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        timesheet_data = validated_data.pop("timesheet")
        shift_log = validated_data.pop("shift_log")
        method = validated_data.pop("method")
        instance.location = validated_data.get("location", instance.location)
        instance.time_in = validated_data.get("time_in", instance.time_in)
        instance.time_out = validated_data.get("time_out", instance.time_out)
        instance.break_duration = validated_data.get(
            "break_duration", instance.break_duration
        )
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.save()

        def update_data(
                shift_instance, update_instance=None, unit=None, shift_action=None
        ):
            # update_instance is shift log
            if shift_action:
                update_instance = ShiftLog.objects.create(shift=shift_instance)
                update_instance.user = user
                update_instance.action = method
            update_instance.duration = shift_instance.duration()
            update_instance.shift_date = shift_instance.time_in.date()
            update_instance.staff = unit.get("staff", item_instance.staff)
            update_instance.notes = unit.get("notes", item_instance.notes)

            update_instance.save()

        item_with_shift_id = Timesheet.objects.filter(shift=instance.pk).values_list(
            "id", flat=True
        )
        id_pool = []

        for item in timesheet_data:
            if "id" in item.keys():
                item_instance = Timesheet.objects.get(id=item.get("id"))
                if item_instance is not None:
                    update_data(
                        shift_instance=instance,
                        update_instance=item_instance,
                        unit=item,
                    )
                    update_data(shift_instance=instance, unit=item, shift_action=True)
                    id_pool.append(item_instance.id)
                else:
                    continue
            else:
                item_instance = Timesheet.objects.create(shift=instance, **item)
                update_data(
                    shift_instance=instance,
                    update_instance=item_instance,
                    unit=item,
                )
                id_pool.append(item_instance.id)

        for item_id in item_with_shift_id:
            if item_id not in id_pool:
                Timesheet.objects.filter(pk=item_id).delete()

        return instance
