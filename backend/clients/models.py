from django.db import models
import uuid

# Create your models here.
class Client(models.Model):
    id = models.UUIDField(blank=False, primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=70, blank=False, default="")
    phone = models.CharField(max_length=15, blank=False, default="")
    mobile = models.CharField(max_length=15, blank=False, default="")
    address = models.CharField(max_length=70, blank=False, default="")
    city = models.CharField(max_length=20, blank=False, default="")
    post_code = models.CharField(max_length=20, blank=False, default="")
    email = models.CharField(max_length=20, blank=False, default="")
    status = models.BooleanField(default=False)
    def __str__(self):
        return self.name
