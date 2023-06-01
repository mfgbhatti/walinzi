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

    def duration(self):
        return self.time_out - self.time_in # not working

    def __str__(self):
        guard = ", ".join(str(seg) for seg in self.staff.all())
        return f"{self.site} is coverd by {guard}."

    class Meta:
        ordering = ("time_in", "time_out")


# class ShiftSchedule(models.Model):
#     site = models.ForeignKey(Site, on_delete=models.CASCADE, null=True, blank=True)
#     started = models.DateField()
#     ended = models.DateField()
#     shifts = models.ManyToManyField(Shift)
