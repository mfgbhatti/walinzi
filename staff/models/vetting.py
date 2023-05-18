from django.db import models

from common.models import BaseDate
from .staff import Staff

class StaffVetting(BaseDate):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank=True, related_name="vetting")

    class Meta:
        db_table = "staff_vetting"

        verbose_name = "Vetting"
        verbose_name_plural = "Vetting"