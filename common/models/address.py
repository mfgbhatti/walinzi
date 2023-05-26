"""
base for address
"""
from django.db import models


class BaseAddress(models.Model):
    """Base address model."""

    street = models.CharField(
        max_length=255,
    )
    city = models.CharField(
        max_length=30,
    )

    post_code = models.CharField(
        max_length=15,
    )

    class Meta:
        """Meta option."""

        abstract = True
