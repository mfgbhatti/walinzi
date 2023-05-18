from django.db import models

from .staff import Staff


class StaffEmployer(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name="employer", null=True, blank=True)
    _from = models.DateField(null=True, blank=True)
    _until = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    contact_email = models.EmailField(max_length=100, null=True, blank=True)
    contact_person = models.CharField(max_length=50, null=True, blank=True)
    contact_phone = models.CharField(max_length=50, null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    post_code = models.CharField(max_length=50, null=True, blank=True)
    reason = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = "staff_employer"

        verbose_name = "Employer"
        verbose_name_plural = "Employers"