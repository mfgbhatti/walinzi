"""
model for staff
"""
from django.db import models

from common.models import BaseContact
from .staff import Staff


class StaffReference(BaseContact):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="reference", null=True, blank=True)
    occupation = models.CharField(max_length=50, null=True, blank=True)
    how_long = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = "staff_reference"

        verbose_name = "Reference"
        verbose_name_plural = "References"
