from django.db import models

from backend.location.models import Location
from backend.staff.models import Staff
from backend.user.models import MyBaseUser as User


class Shift(models.Model):
    id = models.AutoField(primary_key=True)
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE, related_name="shifts", null=True, blank=True
    )
    time_in = models.DateTimeField(null=True, blank=True)
    time_out = models.DateTimeField(null=True, blank=True)
    # break_duration = datetime.timedelta(hours=1)  # Adjust the break duration as needed
    break_duration = models.DurationField(
        blank=True, null=True
    )  # Duration of any breaks taken during the shift
    is_active = models.BooleanField(default=True)
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
        result = self.time_out - self.time_in - self.break_duration
        hours = result.total_seconds() / 3600  # Convert duration to hours
        # return "%.2f" % hours # Format to 2 decimal places
        return "{:.2f}".format(hours)

    def __str__(self):
        return f"{self.time_in.strftime('%d/%m/%Y')} at {self.location}."

    def client_name(self):
        return self.location.customer.client.name

    class Meta:
        ordering = ("time_in", "time_out")
        db_table = "shift"

        verbose_name = "Shift"
        verbose_name_plural = "Shifts"


class Timesheet(models.Model):
    """
    this will be mainly addressing staff time
    Do not use ForeignKey if you want to assign single staff, to single shift
    """

    id = models.AutoField(primary_key=True)
    staff = models.ForeignKey(
        Staff, on_delete=models.CASCADE, related_name="timesheet", null=True, blank=True
    )
    shift = models.ForeignKey(
        Shift, on_delete=models.CASCADE, related_name="timesheet", null=True, blank=True
    )
    shift_date = models.DateField(blank=True, null=True)  # Date of the timesheet entry
    duration = models.FloatField(
        blank=True, null=True
    )  # Duration of the timesheet entry
    notes = models.TextField(blank=True)  # Any additional notes or comments

    # def duration(self):
    #     result = self.time_out - self.time_in
    #     hours = result.total_seconds() / 3600  # Convert duration to hours
    #     # return "%.2f" % hours # Format to 2 decimal places
    #     return "{:.2f}".format(hours, 2)

    # def __str__(self):
    #     return f"{self.time_in.strftime('%d/%m/%Y')} for {self.staff}."

    class Meta:
        # ordering = ("time_in", "time_out")
        db_table = "timesheet"

        verbose_name = "Timesheet"
        verbose_name_plural = "Timesheet"

        # unique_together = (
        #     "staff",
        #     "shift",
        #     "shift_date",
        # )  # Ensure one entry per staff, shift, and date


class ShiftLog(models.Model):
    """
    Main this will address user changing shifts
    """

    id = models.AutoField(primary_key=True)
    action = models.CharField(max_length=20, null=True, blank=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="shift_log", blank=True, null=True
    )
    staff = models.ForeignKey(
        Staff, on_delete=models.CASCADE, related_name="shift_log", null=True, blank=True
    )
    shift = models.ForeignKey(
        Shift, on_delete=models.CASCADE, related_name="shift_log", null=True, blank=True
    )
    shift_date = models.DateField(blank=True, null=True)  # Date of the timesheet entry
    duration = models.FloatField(
        blank=True, null=True
    )  # Duration of the timesheet entry
    notes = models.TextField(blank=True)  # Any additional notes or comments
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "shift_log"

        verbose_name = "Shift Log"
        verbose_name_plural = "Shift Logs"

# class ShiftSchedule(models.Model):
#     site = models.ForeignKey(Site, on_delete=models.CASCADE, null=True, blank=True)
#     started = models.DateField()
#     ended = models.DateField()
#     shifts = models.ManyToManyField(Shift)
