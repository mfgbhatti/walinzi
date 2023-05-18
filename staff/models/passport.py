from django.db import models

from .staff import Staff


class StaffPassort(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="passport", null=True, blank=True)
    country = models.CharField(max_length=50, null=True, blank=True)
    document_no = models.CharField(max_length=50, null=True, blank=True)
    entry_uk = models.DateField(null=True, blank=True)
    expiry = models.DateField(null=True, blank=True)
    issue = models.DateField(null=True, blank=True)
    visa_expiry = models.DateField(null=True, blank=True)
    visa_issue = models.DateField(null=True, blank=True)
    visa_needed = models.BooleanField(default=False)
    visa_type = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = "staff_passport"

        verbose_name = "Passport"
        verbose_name_plural = "Passports"
