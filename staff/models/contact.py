"""
model for staff
"""
from django.db import models

from common.models import BaseContact
from .staff import Staff


class StaffContact(BaseContact):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="contact", null=True, blank=True)

    class Meta:
        db_table = "staff_contacts"

        verbose_name = "Emergency Contact"
        verbose_name_plural = "Emergency Contacts"
