from django.db import models

from .staff import Staff


class StaffPhone(models.Model):
    """Site phone model."""

    staff = models.ForeignKey(
        Staff,
        on_delete=models.CASCADE,
        related_name="phones",
    )
    title = models.CharField(max_length=20, default="")
    phone = models.CharField(
        max_length=20,
    )

    class Meta:
        """Meta class."""

        db_table = "staff_phone"

        verbose_name = "Staff Phone"
        verbose_name_plural = "Staff Phones"

    def __str__(self):
        return self.phone


class StaffEmail(models.Model):
    """Site email model."""

    staff = models.ForeignKey(
        Staff,
        on_delete=models.CASCADE,
        related_name="emails",
    )
    title = models.CharField(max_length=20, default="")
    email = models.EmailField(
        max_length=100,
    )

    class Meta:
        """Meta class."""

        db_table = "staff_email"

        verbose_name = "Staff Email"
        verbose_name_plural = "Staff Emails"

    def __str__(self):
        return self.email