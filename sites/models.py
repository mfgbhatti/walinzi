"""
sites for clients for customers
"""
import uuid
from django.db import models

from common.models import BaseModel, BaseAddress
from clients.models import Client

# Create your models here.


class Site(BaseModel):
    """Site model."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=80, default="")
    client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name="sites",
        null=True,
        blank=True,
    )

    class Meta:
        """Meta class."""

        db_table = "sites"

        verbose_name = "Site"
        verbose_name_plural = "Sites"

    def __str__(self):
        return self.name


class SiteAddress(BaseAddress):
    """Site address model.
    with street, city, post_code
    """

    site = models.OneToOneField(
        Site,
        on_delete=models.CASCADE,
        related_name="address",
    )

    class Meta:
        """Meta class."""

        db_table = "site_address"

        verbose_name = "Site Address"
        verbose_name_plural = "Site Addresses"

    def __str__(self):
        return self.street + ", " + self.post_code + ", " + self.city + "."

    def get_full_address(self):
        """Get full address."""
        return f"{self.street}, {self.post_code}, {self.city}."

class SitePhone(models.Model):
    """Site phone model."""

    site = models.ForeignKey(
        Site,
        on_delete=models.CASCADE,
        related_name="phones",
    )
    title = models.CharField(max_length=20, default="")
    phone = models.CharField(
        max_length=20,
    )

    class Meta:
        """Meta class."""

        db_table = "site_phone"

        verbose_name = "Site Phone"
        verbose_name_plural = "Site Phones"

    def __str__(self):
        return self.phone

class SiteEmail(models.Model):
    """Site email model."""

    site = models.ForeignKey(
        Site,
        on_delete=models.CASCADE,
        related_name="emails",
    )
    title = models.CharField(max_length=20, default="")
    email = models.EmailField(
        max_length=100,
    )

    class Meta:
        """Meta class."""

        db_table = "site_email"

        verbose_name = "Site Email"
        verbose_name_plural = "Site Emails"

    def __str__(self):
        return self.email

class SiteNotes(models.Model):
    """Site notes model."""

    site = models.ForeignKey(
        Site,
        on_delete=models.CASCADE,
        related_name="notes",
    )
    title = models.CharField(max_length=20, default="")
    note = models.TextField(max_length=255, default="")

    class Meta:
        """Meta class."""

        db_table = "site_notes"

        verbose_name = "Site Note"
        verbose_name_plural = "Site Notes"

    def __str__(self):
        return self.note
