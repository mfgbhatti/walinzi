from django.db import models

from .staff import Staff


class StaffLicence(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="licence", null=True, blank=True)
    licence_no = models.CharField(max_length=50, null=True, blank=True)
    expiry_date = models.DateField(null=True, blank=True)
    role = models.CharField(max_length=80, null=True, blank=True)
    registered = models.DateField(null=True, blank=True)
    licence_sector = models.CharField(max_length=50, null=True, blank=True)
    status = models.CharField(max_length=80, null=True, blank=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = "staff_licence"

        verbose_name = "Licence"
        verbose_name_plural = "Licences"
