from django.db import models

from common.models import BaseDate
from .staff import Staff


class StaffContract(BaseDate):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank=True, related_name="contract")

    class Meta:
        db_table = "staff_contract"

        verbose_name = "Contract"
        verbose_name_plural = "Contracts"
