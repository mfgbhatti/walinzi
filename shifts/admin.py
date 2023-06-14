from django.contrib import admin

from shifts.models import Shift
from shifts.models import Timesheet

# Register your models here.

admin.site.register(Shift)
admin.site.register(Timesheet)