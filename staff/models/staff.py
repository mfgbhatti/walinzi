"""
model for staff
"""
import uuid
from django.db import models

from customers.models import Customer
from common.models import BaseModel

# Create your models here.


class Staff(BaseModel):
    """Staff"""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=80, default="")
    is_active = models.BooleanField(default=True, blank=False, null=False)
    customer = models.ForeignKey(Customer, null=True, blank=True, on_delete=models.CASCADE, related_name="staff")

    class Meta:
        """Meta class."""

        db_table = "staff"

        verbose_name = "Staff"
        verbose_name_plural = "Staff"

    def __str__(self):
        return self.name