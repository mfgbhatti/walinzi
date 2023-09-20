from django.contrib import admin

from backend.client.models import Client


class ClientAdmin(admin.ModelAdmin):
    class Meta:
        model = Client
        fields = ("id", "name")


# Register your models here.
admin.site.register(Client, ClientAdmin)
