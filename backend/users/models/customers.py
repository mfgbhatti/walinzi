"""models for customers"""
import uuid
from django.db import models

from backend.common.models import BaseModel, BaseAddress, BaseDetail


class Customer(BaseModel):
    """Customer model."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=80, default="")

    class Meta:
        """Meta class."""
        db_table = "customers"

        verbose_name = "Customer"
        verbose_name_plural = "Customers"

    def __str__(self):
        return self.name


class CustomerAddress(BaseAddress):
    """Customer address model."""

    customer = models.OneToOneField(
        Customer,
        on_delete=models.CASCADE,
        related_name="address",
    )

    class Meta:
        """Meta class."""

        db_table = "customer_address"

        verbose_name = "Customer Address"
        verbose_name_plural = "Customer Addresses"

    def __str__(self):
        return self.street + ", " + self.post_code + ", " + self.city + "."

    def get_full_address(self):
        """Get full address."""
        return f"{self.street}, {self.post_code}, {self.city}."

class CustomerDetail(BaseDetail):
    """Customer details model."""

    customer = models.OneToOneField(
        Customer,
        on_delete=models.CASCADE,
        related_name="details",
    )

    class Meta:
        """Meta class."""

        db_table = "customer_detail"

        verbose_name = "Customer Detail"
        verbose_name_plural = "Customer Detail"