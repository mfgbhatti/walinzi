from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    """Base model."""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        """Meta option."""

        abstract = True
        get_latest_by = "created_at"
        ordering = ["-created_at", "-updated_at"]


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


class BaseDetail(models.Model):
    """Base detail model."""

    vat_number = models.CharField(max_length=20, blank=True)
    website = models.URLField(
        max_length=100,
    )

    class Meta:
        """Meta option."""

        abstract = True


class BaseContact(models.Model):
    """base model for contact person"""

    relation = models.CharField(max_length=50, null=True, blank=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    post_code = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        abstract = True


class BaseDate(models.Model):
    started = models.DateField(null=True, blank=True)
    ended = models.DateField(null=True, blank=True)

    class Meta:
        abstract = True