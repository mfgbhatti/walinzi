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
