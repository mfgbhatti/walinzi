from django.db import models

from .staff import Staff


class StaffEducation(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="education", null=True, blank=True)
    _from = models.DateField(null=True, blank=True)
    _until = models.DateField(null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    institute = models.CharField(max_length=100, null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    speciality = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = "staff_education"

        verbose_name = "Degree"
        verbose_name_plural = "Degrees"
