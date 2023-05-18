from django.db import models

from .staff import Staff


class StaffHealth(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank=True, related_name="health")
    absent_days = models.CharField(max_length=50, null=True, blank=True)  # last 2 yesrs
    additional_comment = models.CharField(max_length=225, null=True, blank=True)
    any_other = models.CharField(max_length=225, null=True, blank=True)
    can_be_examined = models.BooleanField(null=True, blank=True)
    glasses = models.BooleanField(null=True, blank=True)
    has_condition = models.BooleanField(null=True, blank=True)
    heart_disease = models.BooleanField(null=True, blank=True)
    is_diabetec = models.BooleanField(null=True, blank=True)
    is_disabled = models.BooleanField(null=True, blank=True)
    needs_carer = models.BooleanField(null=True, blank=True)

    class Meta:
        db_table = "staff_health"

        verbose_name = "Health"
        verbose_name_plural = "Health"