"""
base model for vetting or contract
"""
from django.db import models


class BaseDate(models.Model):
    started = models.DateField(null=True, blank=True)
    ended = models.DateField(null=True, blank=True)

    class Meta:
        abstract = True
