"""
model for staff
"""
from django.db import models

from backend.client.models import Client
from backend.subcontractor.models import Subcontractor


# Create your models here.


class Staff(models.Model):
    """Staff"""

    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="staff",
        null=True,
        blank=True,
    )
    subcontractor = models.ForeignKey(
        Subcontractor,
        on_delete=models.CASCADE,
        related_name="staff",
        null=True,
        blank=True,
    )

    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30, default="")
    last_name = models.CharField(max_length=30, default="")
    display_name = models.CharField(max_length=30, null=True, blank=True, default="")
    is_active = models.BooleanField(default=True, blank=False, null=False)
    pay_rate = models.DecimalField(
        max_digits=10, null=True, blank=True, decimal_places=2
    )

    class Meta:
        """Meta class."""

        db_table = "staff"
        ordering = ("first_name",)

        verbose_name = "Staff"
        verbose_name_plural = "Staff"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
