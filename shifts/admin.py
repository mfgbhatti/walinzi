from django.contrib import admin

from shifts.models import Shift, ShiftSchedule

# Register your models here.


class ShiftsInline(admin.StackedInline):
    model = ShiftSchedule.shifts.through
    extra = 0


class ShiftAdmin(admin.ModelAdmin):
    inlines = (ShiftsInline,)

class ScheduleAdmin(admin.ModelAdmin):
    inlines= (ShiftsInline,)
    exclude = ("shifts")

admin.site.register(Shift, ShiftAdmin)
admin.site.register(ShiftSchedule, ShiftAdmin)