"""
base model for details may be mainly for customers
"""
from django.db import models


class BaseDetail(models.Model):
    """Base detail model."""

    vat_number = models.CharField(max_length=20, blank=True)
    website = models.URLField(
        max_length=100,
    )

    class Meta:
        """Meta option."""

        abstract = True
