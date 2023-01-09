"""models for clients"""
import uuid
from django.db import models

from backend.customers.models import Customer
from backend.users.models import BaseUser as User
from backend.common.models import BaseModel, BaseAddress, BaseDetail


class Client(BaseModel):
    """Client model."""

    id = models.AutoField(primary_key=True)
    owned_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="clients")
    name = models.CharField(max_length=80, default="")
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="created_by_user")
    updated_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="updated_by_user")

    class Meta:
        """Meta class."""

        db_table = "clients"

        verbose_name = "Client"
        verbose_name_plural = "Clients"

    def __str__(self):
        return self.name


class ClientAddress(BaseAddress):
    """Client address model.
    with street, city, post_code
    """

    client = models.OneToOneField(
        Client,
        on_delete=models.CASCADE,
        related_name="address",
    )

    class Meta:
        """Meta class."""

        db_table = "client_address"

        verbose_name = "Client Address"
        verbose_name_plural = "Client Addresses"

    def __str__(self):
        return self.street + ", " + self.post_code + ", " + self.city + "."

    def get_full_address(self):
        """Get full address."""
        return f"{self.street}, {self.post_code}, {self.city}."


class ClientDetail(BaseDetail):
    """Client details model.
    with vat_number, website
    """

    client = models.OneToOneField(
        Client,
        on_delete=models.CASCADE,
        related_name="detail",
    )

    class Meta:
        """Meta class."""

        db_table = "client_detail"

        verbose_name = "Client Detail"
        verbose_name_plural = "Client Detail"

    def __str__(self):
        return self.client.name


class ClientPhone(models.Model):
    """Client phone model."""

    detail = models.ForeignKey(
        ClientDetail,
        on_delete=models.CASCADE,
        related_name="phoneNumbers",
    )
    label = models.CharField(max_length=20, default="")
    phone = models.CharField(
        max_length=20,
    )

    class Meta:
        """Meta class."""

        db_table = "client_phone"

        verbose_name = "Client Phone"
        verbose_name_plural = "Client Phones"

    def __str__(self):
        return self.phone


class ClientEmail(models.Model):
    """Client email model."""

    detail = models.ForeignKey(
        ClientDetail,
        on_delete=models.CASCADE,
        related_name="emails",
    )
    label = models.CharField(max_length=20, default="")
    email = models.EmailField(
        max_length=100,
    )

    class Meta:
        """Meta class."""

        db_table = "client_email"

        verbose_name = "Client Email"
        verbose_name_plural = "Client Emails"

    def __str__(self):
        return self.email


class ClientNotes(models.Model):
    """Client notes model."""

    detail = models.ForeignKey(
        ClientDetail,
        on_delete=models.CASCADE,
        related_name="notes",
    )
    label = models.CharField(max_length=20, default="")
    note = models.TextField(max_length=255, default="")

    class Meta:
        """Meta class."""

        db_table = "client_notes"

        verbose_name = "Client Note"
        verbose_name_plural = "Client Notes"

    def __str__(self):
        return self.note
