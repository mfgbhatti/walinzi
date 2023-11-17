from django.contrib import admin

from backend.shift.models import Shift, Timesheet


class TimesheetInline(admin.TabularInline):
    model = Timesheet
    fields = ("staff", "notes")
    extra = 1


class ShiftAdmin(admin.ModelAdmin):
    list_display = ("get_time_in", "location", "get_client_name",)
    list_filter = ("location", "location__customer__client__name",)

    def get_time_in(self, obj):
        return obj.time_in.date() if obj.time_in else ""

    def get_client_name(self, obj):
        return obj.client_name()

    get_client_name.short_description = "Client"
    get_time_in.short_description = "Start Date"
    inlines = [TimesheetInline]

    class Meta:
        model = Shift
        fields = ("id", "location", "time_in", "time_out", "break_duration", "is_active")


# Register your models here.
admin.site.register(Shift, ShiftAdmin)
