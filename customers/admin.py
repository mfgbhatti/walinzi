"""admin for customers"""
from django.contrib import admin
from .models import Customer, CustomerAddress, CustomerDetail, CustomerEmail, CustomerPhone, CustomerNotes


class CustomerNotesInline(admin.TabularInline):
    """Customer notes inline admin class."""

    model = CustomerNotes
    extra = 0


class CustomerPhoneInline(admin.TabularInline):
    """Customer phone inline admin class."""

    model = CustomerPhone
    extra = 0


class CustomerEmailInline(admin.TabularInline):
    """Customer email inline admin class."""

    model = CustomerEmail
    extra = 0


class CustomerAddressInline(admin.TabularInline):
    """Customer address inline admin class."""

    model = CustomerAddress
    extra = 0


class CustomerDetailInline(admin.TabularInline):
    """Customer detail inline admin class."""

    # inlines = [CustomerNotesInline, CustomerPhoneInline, CustomerEmailInline]
    model = CustomerDetail
    extra = 0


class CustomerAdmin(admin.ModelAdmin):
    """Customer admin class."""

    inlines = [CustomerAddressInline, CustomerDetailInline, CustomerNotesInline, CustomerPhoneInline,
               CustomerEmailInline]
    list_display = (
        "name",
        "get_address",
    )

    def get_address(self, obj=None):
        return obj.address.get_full_address()


admin.site.register(Customer, CustomerAdmin)
# admin.site.register(CustomerDetail, CustomerDetailAdmin)
