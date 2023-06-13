"""
this is just to use in future for logging
"""
import uuid
from django.db import models


class BaseModel(models.Model):
    """Base model."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=80, default="")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(
        auto_now=True,
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        """Meta option."""

        abstract = True
        get_latest_by = "created_at"
        ordering = ["-created_at", "-updated_at"]
