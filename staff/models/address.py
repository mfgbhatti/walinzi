"""
model for staff
"""
from django.db import models

from .staff import Staff
from common.models import BaseAddress


class StaffAddress(BaseAddress):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank=True, related_name="address")
    _from = models.DateField(null=True, blank=True)
    _until = models.DateField(null=True, blank=True)

    class Meta:
        db_table = "staff_address"

        verbose_name = "Address"
        verbose_name_plural = "Address"
