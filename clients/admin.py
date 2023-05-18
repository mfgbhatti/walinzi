"""admin for clients"""
from django.contrib import admin
from .models import Client, ClientAddress, ClientDetail, ClientEmail, ClientPhone, ClientNotes


class ClientNotesInline(admin.TabularInline):
    """Client notes inline admin class."""

    model = ClientNotes
    extra = 0


class ClientPhoneInline(admin.TabularInline):
    """Client phone inline admin class."""

    model = ClientPhone
    extra = 0


class ClientEmailInline(admin.TabularInline):
    """Client email inline admin class."""

    model = ClientEmail
    extra = 0


class ClientAddressInline(admin.TabularInline):
    """Client address inline admin class."""

    model = ClientAddress
    extra = 0


class ClientDetailInline(admin.TabularInline):
    """Client detail inline admin class."""

    # inlines = [ClientNotesInline, ClientPhoneInline, ClientEmailInline]
    model = ClientDetail
    extra = 0


class ClientAdmin(admin.ModelAdmin):
    """Client admin class."""

    inlines = [ClientAddressInline, ClientDetailInline, ClientNotesInline, ClientPhoneInline, ClientEmailInline]
    list_display = (
        "name",
        "get_address",
    )

    def get_address(self, obj=None):
        return obj.address.get_full_address()


admin.site.register(Client, ClientAdmin)
# admin.site.register(ClientDetail, ClientDetailAdmin)
