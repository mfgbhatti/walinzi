"""models for customers"""
import uuid
from django.db import models

from common.models import BaseModel, BaseAddress, BaseDetail


class Customer(BaseModel):
    """Customer model."""

    class Meta:
        """Meta class."""

        db_table = "customers"

        verbose_name = "Customer"
        verbose_name_plural = "Customers"

    def __str__(self):
        return self.name


class CustomerAddress(BaseAddress):
    """Customer address model.
    with street, city, post_code
    """

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
    """Customer details model.
    with vat_number, website
    """

    customer = models.OneToOneField(
        Customer,
        on_delete=models.CASCADE,
        related_name="detail",
    )

    logo = models.CharField(max_length=255, default="", blank=True)

    class Meta:
        """Meta class."""

        db_table = "customer_detail"

        verbose_name = "Customer Detail"
        verbose_name_plural = "Customer Detail"

    def __str__(self):
        return self.customer.name


class CustomerPhone(models.Model):
    """Customer phone model."""

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="phones",
    )
    title = models.CharField(max_length=20, default="")
    phone = models.CharField(
        max_length=20,
    )

    class Meta:
        """Meta class."""

        db_table = "customer_phone"

        verbose_name = "Customer Phone"
        verbose_name_plural = "Customer Phones"

    def __str__(self):
        return self.phone


class CustomerEmail(models.Model):
    """Customer email model."""

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="emails",
    )
    title = models.CharField(max_length=20, default="")
    email = models.EmailField(
        max_length=100,
    )

    class Meta:
        """Meta class."""

        db_table = "customer_email"

        verbose_name = "Customer Email"
        verbose_name_plural = "Customer Emails"

    def __str__(self):
        return self.email


class CustomerNotes(models.Model):
    """Customer notes model."""

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="notes",
    )
    title = models.CharField(max_length=20, default="")
    note = models.TextField(max_length=255, default="")

    class Meta:
        """Meta class."""

        db_table = "customer_notes"

        verbose_name = "Customer Note"
        verbose_name_plural = "Customer Notes"

    def __str__(self):
        return self.note
