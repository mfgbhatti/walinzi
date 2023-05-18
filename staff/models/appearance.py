from django.db import models

from .staff import Staff


class StaffAppearance(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True, blank=True, related_name="appearance")
    bust = models.CharField(max_length=50, null=True, blank=True)
    chest = models.CharField(max_length=50, null=True, blank=True)
    collar = models.CharField(max_length=50, null=True, blank=True)
    eye_colour = models.CharField(max_length=50, null=True, blank=True)
    facial_hair = models.CharField(max_length=50, null=True, blank=True)
    hair_colour = models.CharField(max_length=50, null=True, blank=True)
    hair_length = models.CharField(max_length=50, null=True, blank=True)
    hat_size = models.CharField(max_length=50, null=True, blank=True)
    height = models.CharField(max_length=50, null=True, blank=True)
    hips = models.CharField(max_length=50, null=True, blank=True)
    inside_leg = models.CharField(max_length=50, null=True, blank=True)
    jacket_size = models.CharField(max_length=50, null=True, blank=True)
    shoe_size = models.CharField(max_length=50, null=True, blank=True)
    skirt_size = models.CharField(max_length=50, null=True, blank=True)
    trousers_size = models.CharField(max_length=50, null=True, blank=True)
    waist = models.CharField(max_length=50, null=True, blank=True)
    weight = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = "staff_appearance"

        verbose_name = "Appearance"
        verbose_name_plural = "Appearances"
