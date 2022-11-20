"""models for cleints"""
import uuid
from django.db import models

class Client(models.Model):
    """model for client"""
    id = models.UUIDField(blank=False, primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=70, blank=False, null=False, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)


class ClientDetail(models.Model):
    """client detail model"""
    client = models.OneToOneField(
        Client, related_name="detail", on_delete=models.CASCADE, primary_key=True, default=""
    )
    display_name = models.CharField(max_length=70, null=True, blank=True, default="")
    vat = models.CharField(max_length=70, null=True, blank=True, default="")
    website = models.CharField(max_length=70, null=True, blank=True, default="")
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.display_name + " | " + self.client.name


class Address(models.Model):
    """cleint address model"""
    detail = models.OneToOneField(
        ClientDetail, related_name="address", on_delete=models.CASCADE, primary_key=True, default=""
    )
    street = models.CharField(max_length=210, default="")
    city = models.CharField(max_length=30, default="")
    post_code = models.CharField(max_length=30, default="")


class Note(models.Model):
    """client note model"""
    id = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, null=True, blank=True, on_delete=models.CASCADE, related_name="notes")
    string = models.CharField(max_length=210, blank=False, default="")
    title = models.CharField(max_length=30, null=True, blank=True, default="")

    class Meta:
        """using django"""
        verbose_name_plural = "Notes"

    def __str__(self):
        return self.title + " | " + self.client.name


class PhoneNumber(models.Model):
    """client phone number model"""
    id = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, null=True, blank=True, on_delete=models.CASCADE, related_name="phone_numbers")
    string = models.CharField(max_length=30, blank=True, null=True, default="")
    title = models.CharField(max_length=30, null=True, blank=True, default="")

    class Meta:
        """using django"""
        verbose_name_plural = "PhoneNumbers"

    def __str__(self):
        return self.title + " | " + self.client.name


class Email(models.Model):
    """client enail model"""
    id = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, null=True, blank=True, on_delete=models.CASCADE, related_name="emails")
    string = models.CharField(max_length=30, blank=True, null=True, default="")
    title = models.CharField(max_length=30, null=True, blank=True, default="")

    class Meta:
        """using django"""
        verbose_name_plural = "Emails"

    def __str__(self):
        return self.title + " | " + self.client.name
