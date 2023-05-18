from django.contrib import admin

from sites.models import Site, SiteAddress, SiteEmail, SitePhone, SiteNotes

# Register your models here.


class SiteAddressInline(admin.TabularInline):
    model = SiteAddress
    extra = 0


class SiteEmailInline(admin.TabularInline):
    model = SiteEmail
    extra = 0


class SitePhoneInline(admin.TabularInline):
    model = SitePhone
    extra = 0


class SiteNoteInline(admin.TabularInline):
    model = SiteNotes
    extra = 0


class SiteAdmin(admin.ModelAdmin):
    inlines = [SiteAddressInline, SiteEmailInline, SitePhoneInline, SiteNoteInline]
    list_display = (
        "name",
        "get_address",
    )

    def get_address(self, obj=None):
        return obj.address.get_full_address()

admin.site.register(Site, SiteAdmin)