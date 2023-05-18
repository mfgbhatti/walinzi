from django.db import models

from .staff import Staff


class StaffLicence(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="licence", null=True, blank=True)
    sia_number = models.CharField(max_length=50, null=True, blank=True)
    sia_expiry = models.DateField(null=True, blank=True)
    licence_sector = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = "staff_licence"

        verbose_name = "Licence"
        verbose_name_plural = "Licences"
