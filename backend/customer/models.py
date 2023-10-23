"""models for cleints"""
from django.db import models

from backend.client.models import Client


class Customer(models.Model):
    """model for customer"""

    id = models.AutoField(primary_key=True)
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="customers",
        null=True,
        blank=True,
    )
    name = models.CharField(max_length=70, blank=False, null=False, default="")
    email = models.EmailField(max_length=120, blank=False, null=True)
    mobile = models.CharField(max_length=15, blank=False, null=False, default="")
    land_line = models.CharField(max_length=15, blank=False, null=True)
    address = models.CharField(max_length=150, blank=False, null=False, default="")
    city = models.CharField(max_length=20, blank=False, null=False, default="")
    post_code = models.CharField(max_length=20, blank=False, null=False, default="")
    is_active = models.BooleanField(default=True, null=False)
    reference = models.CharField(max_length=200, blank=False, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        db_table = "customer"
        verbose_name = "Customer"
        verbose_name_plural = "Customers"
        ordering = ("name",)
