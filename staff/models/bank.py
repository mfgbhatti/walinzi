"""
model for staff
"""
from django.db import models

from .staff import Staff


class StaffBank(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="bank", null=True, blank=True)
    bank_name = models.CharField(max_length=50, null=True, blank=True)
    account_title = models.CharField(max_length=50, null=True, blank=True)
    account_number = models.CharField(max_length=50, null=True, blank=True)
    sort_code = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = "staff_bank"

        verbose_name = "Bank Details"
        verbose_name_plural = "Bank Details"
