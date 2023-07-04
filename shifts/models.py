from django.db import models

from common.models import BaseModel
from sites.models import Site
from staff.models import Staff


class Shift(BaseModel):
    site = models.ForeignKey(Site, on_delete=models.CASCADE, related_name="shifts", null=True, blank=True)
    # staff = models.ManyToManyField(Staff) # removed because shift will be linked to staff throught timesheet model
    time_in = models.DateTimeField()
    time_out = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    # Add other shift-specific fields here
    name = None

    @property
    def name(self):
        raise AttributeError("'Shift' object has no attribute 'name'")

    # @classmethod
    # def get_shifts_for_staff(cls, staff):
    #     return cls.objects.filter(staff=staff)

    def duration(self):
        result = self.time_out - self.time_in
        hours = result.total_seconds() / 3600  # Convert duration to hours
        # return "%.2f" % hours # Format to 2 decimal places
        return "{:.2f}".format(hours, 2)

    def __str__(self):
        return f"{self.time_in.strftime('%d/%m/%Y')} for {self.site}."

    class Meta:
        ordering = ("time_in", "time_out")
        db_table = "shifts"

        verbose_name = "Shift"
        verbose_name_plural = "Shifts"


# class ShiftSchedule(models.Model):
#     site = models.ForeignKey(Site, on_delete=models.CASCADE, null=True, blank=True)
#     started = models.DateField()
#     ended = models.DateField()
#     shifts = models.ManyToManyField(Shift)
class Timesheet(models.Model):
    """this will be mainly addressing staff time"""

    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="timesheet", null=True, blank=True)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE, related_name="timesheet", null=True, blank=True)
    time_in = models.DateTimeField()
    time_out = models.DateTimeField()

    def duration(self):
        result = self.time_out - self.time_in
        hours = result.total_seconds() / 3600  # Convert duration to hours
        # return "%.2f" % hours # Format to 2 decimal places
        return "{:.2f}".format(hours, 2)

    def __str__(self):
        return f"{self.time_in.strftime('%d/%m/%Y')} for {self.staff}."

    @classmethod
    def get_shifts_for_staff(cls, staff):
        return cls.objects.filter(staff=staff)

    class Meta:
        ordering = ("time_in", "time_out")
        db_table = "timesheets"

        verbose_name = "Timesheet"
        verbose_name_plural = "Timesheets"