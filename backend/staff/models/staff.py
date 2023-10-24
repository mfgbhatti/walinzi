"""
model for staff
"""
from django.db import models

from backend.client.models import Client


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

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=80, default="")
    is_active = models.BooleanField(default=True, blank=False, null=False)
    pay_rate = models.DecimalField(
        max_digits=10, null=True, blank=True, decimal_places=2
    )

    class Meta:
        """Meta class."""

        db_table = "staff"
        ordering = ("name",)

        verbose_name = "Staff"
        verbose_name_plural = "Staff"

    def __str__(self):
        return self.name
