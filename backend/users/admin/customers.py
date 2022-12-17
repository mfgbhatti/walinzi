"""admin for customers"""
from django.contrib import admin
from ..models import Customer, CustomerAddress

class CustomerAddressInline(admin.TabularInline):
    """Customer address inline admin class."""
    model = CustomerAddress
    extra = 0

class CustomerAdmin(admin.ModelAdmin):
    """Customer admin class."""
    inlines = [CustomerAddressInline]
    list_display = ("name", "get_address",)
    def get_address(self, obj=None):
        return obj.address.get_full_address()


admin.site.register(Customer, CustomerAdmin)