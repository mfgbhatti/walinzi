"""
base contact model
"""
from django.db import models


class BaseContact(models.Model):
    """base model for contact person"""

    relation = models.CharField(max_length=50, null=True, blank=True)
    name = models.CharField(max_length=50, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=100, null=True, blank=True)
    post_code = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        abstract = True
