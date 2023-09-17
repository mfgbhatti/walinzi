"""models for cleints"""
import uuid
from django.db import models


class Client(models.Model):
    """model for client"""

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, unique=True
    )
    name = models.CharField(max_length=70, blank=False, null=False, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        db_table = "client"
        verbose_name = "Client"
        verbose_name_plural = "Clients"
        ordering = ("name",)
