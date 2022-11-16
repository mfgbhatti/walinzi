from django.db import models
import uuid

# Create your models here.
class Client(models.Model):
    id = models.UUIDField(blank=False, primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=70, blank=False, default="")
    display_name = models.CharField(max_length=70, null=True, blank=True, default="")
    address = models.CharField(max_length=210, blank=False, default="")
    vat = models.CharField(max_length=70, null=True, blank=True, default="")
    website = models.CharField(max_length=70, null=True, blank=True, default="")
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Note(models.Model):
    id = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, null=True, blank=True, on_delete=models.CASCADE, related_name='client_note')
    description: models.CharField(max_length=210)
    label: models.CharField(max_length=30, null=True, blank=True)


    def __str__(self):
        return self.client

class PhoneNumber(models.Model):
    id = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, null=True, blank=True, on_delete=models.CASCADE, related_name='client_phone_numbers')
    phone_number: models.CharField(max_length=30, blank=True, null=True)
    label: models.CharField(max_length=30, null=True, blank=True)
    def __str__(self):
        return self.client
class Email(models.Model):
    id = models.AutoField(primary_key=True)
    client = models.ForeignKey(Client, null=True, blank=True, on_delete=models.CASCADE, related_name='client_emails')
    email: models.CharField(max_length=30, blank=True, null=True)
    label: models.CharField(max_length=30, null=True, blank=True)
    def __str__(self):
        return self.client
