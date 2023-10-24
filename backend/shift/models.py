from django.db import models

from backend.location.models import Location
from backend.staff.models import Staff


class Shift(models.Model):
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE, related_name="shifts", null=True, blank=True
    )
    # staff = models.ManyToManyField(Staff) # removed because shift will be linked to staff throught timesheet model
    time_in = models.DateTimeField()
    time_out = models.DateTimeField()
    # break_duration = datetime.timedelta(hours=1)  # Adjust the break duration as needed
    break_duration = models.DurationField() # Duration of any breaks taken during the shift
    is_active = models.BooleanField(default=True)
    # Add other shift-specific fields here
    name = None
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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
        return f"{self.time_in.strftime('%d/%m/%Y')} for {self.location}."

    class Meta:
        ordering = ("time_in", "time_out")
        db_table = "shifts"

        verbose_name = "Shift"
        verbose_name_plural = "Shifts"


class Timesheet(models.Model):
    """this will be mainly addressing staff time"""

    staff = models.ForeignKey(
        Staff, on_delete=models.CASCADE, related_name="timesheet", null=True, blank=True
    )
    shift = models.ForeignKey(
        Shift, on_delete=models.CASCADE, related_name="timesheet", null=True, blank=True
    )
    date = models.DateField()  # Date of the timesheet entry
    duration = models.IntegerField()  # Duration of the timesheet entry
    notes = models.TextField(blank=True)  # Any additional notes or comments

    # def duration(self):
    #     result = self.time_out - self.time_in
    #     hours = result.total_seconds() / 3600  # Convert duration to hours
    #     # return "%.2f" % hours # Format to 2 decimal places
    #     return "{:.2f}".format(hours, 2)

    # def total_work_duration(self):
    #     # Calculate the total work duration for the shift
    #     work_duration = self.time_out - self.time_in - self.break_duration
    #     return work_duration

    # def __str__(self):
    #     return f"{self.time_in.strftime('%d/%m/%Y')} for {self.staff}."

    class Meta:
        ordering = ("time_in", "time_out")
        db_table = "timesheet"

        verbose_name = "Timesheet"
        verbose_name_plural = "Timesheet"

        unique_together = (
            "staff",
            "shift",
            "date",
        )  # Ensure one entry per staff, shift, and date


# class ShiftSchedule(models.Model):
#     site = models.ForeignKey(Site, on_delete=models.CASCADE, null=True, blank=True)
#     started = models.DateField()
#     ended = models.DateField()
#     shifts = models.ManyToManyField(Shift)
