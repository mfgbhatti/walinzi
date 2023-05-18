"""
model for staff
"""
import uuid
from django.db import models

from sites.models import Site
from .staff import Staff
# Create your models here.


class StaffDetail(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank=True, related_name="details")
    date_of_birth = models.DateField(null=True, blank=True)
    driving_licence = models.CharField(max_length=50, null=True, blank=True)
    ethnic_origin = models.CharField(max_length=50, null=True, blank=True)
    gender = models.CharField(max_length=50, null=True, blank=True)
    is_driving = models.BooleanField(default=False)
    nationality = models.CharField(max_length=50, null=True, blank=True)
    ni_number = models.CharField(max_length=50, null=True, blank=True)
    pay_rate = models.FloatField(null=True, blank=True)
    pin = models.CharField(max_length=50, null=True, blank=True)
    place_of_birth = models.CharField(max_length=50, null=True, blank=True)


    class Meta:
        db_table = "staff_details"

        verbose_name = "Details"
        verbose_name_plural = "Details"
