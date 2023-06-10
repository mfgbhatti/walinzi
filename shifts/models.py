from django.db import models

from common.models import BaseModel
from sites.models import Site
from staff.models import Staff


class Shift(BaseModel):
    site = models.ForeignKey(Site, on_delete=models.CASCADE, related_name="shifts", null=True, blank=True)
    staff = models.ManyToManyField(Staff)
    time_in = models.DateTimeField()
    time_out = models.DateTimeField()
    # Add other shift-specific fields here
    name = None

    @property
    def name(self):
        raise AttributeError("'Shift' object has no attribute 'name'")

    @classmethod
    def get_shifts_for_staff(cls, staff):
        return cls.objects.filter(staff=staff)

    def duration(self):
        result = self.time_out - self.time_in
        hours = result.total_seconds() / 3600  # Convert duration to hours
        # return "%.2f" % hours # Format to 2 decimal places
        return "{:.2f}".format(hours, 2)

    def __str__(self):
        guard = ", ".join(str(seg) for seg in self.staff.all())
        return f"{self.time_in.strftime('%d/%m/%Y')} {self.site} is coverd by {guard}."

    class Meta:
        ordering = ("time_in", "time_out")


# class ShiftSchedule(models.Model):
#     site = models.ForeignKey(Site, on_delete=models.CASCADE, null=True, blank=True)
#     started = models.DateField()
#     ended = models.DateField()
#     shifts = models.ManyToManyField(Shift)
