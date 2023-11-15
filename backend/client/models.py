"""models for cleints"""
import uuid
from django.db import models


class Client(models.Model):
    """model for client"""

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    name = models.CharField(max_length=70, blank=False, null=False, default="")
    email = models.EmailField(max_length=120, blank=False, null=True)
    mobile = models.CharField(max_length=15, blank=True, null=True, default="")
    land_line = models.CharField(max_length=15, blank=False, null=True)
    address = models.CharField(max_length=150, blank=False, null=False, default="")
    city = models.CharField(max_length=20, blank=False, null=False, default="")
    post_code = models.CharField(max_length=20, blank=False, null=False, default="")
    is_active = models.BooleanField(default=True, null=False)
    reference = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        db_table = "client"
        verbose_name = "Client"
        verbose_name_plural = "Clients"
        ordering = ("name",)
