from django.contrib import admin

from staff.models import (
    Staff,
    StaffAddress,
    StaffBank,
    StaffContact,
    StaffContract,
    StaffDetail,
    StaffEducation,
    StaffEmail,
    StaffEmployer,
    StaffPassort,
    StaffPhone,
    StaffAppearance,
    StaffReference,
    StaffHealth,
    StaffVetting,
)


class StaffAddressInline(admin.TabularInline):
    model = StaffAddress
    extra = 0


class StaffBankInline(admin.TabularInline):
    model = StaffBank
    extra = 0


class StaffContactInline(admin.TabularInline):
    model = StaffContact
    extra = 0


class StaffContractInline(admin.TabularInline):
    model = StaffContract
    extra = 0


class StaffDetailInline(admin.TabularInline):
    model = StaffDetail
    extra = 0


class StaffEducationInline(admin.TabularInline):
    model = StaffEducation
    extra = 0


class StaffEmailInline(admin.TabularInline):
    model = StaffEmail
    extra = 0


class StaffEmployerInline(admin.TabularInline):
    model = StaffEmployer
    extra = 0


class StaffPassortInline(admin.TabularInline):
    model = StaffPassort
    extra = 0


class StaffPhoneInline(admin.TabularInline):
    model = StaffPhone
    extra = 0


class StaffAppearanceInline(admin.TabularInline):
    model = StaffAppearance
    extra = 0


class StaffReferenceInline(admin.TabularInline):
    model = StaffReference
    extra = 0


class StaffHealthInline(admin.TabularInline):
    model = StaffHealth
    extra = 0


class StaffVettingInline(admin.TabularInline):
    model = StaffVetting
    extra = 0


class StaffAdmin(admin.ModelAdmin):
    inlines = (
        StaffAddressInline,
        StaffBankInline,
        StaffContactInline,
        StaffContractInline,
        StaffDetailInline,
        StaffEducationInline,
        StaffEmailInline,
        StaffEmployerInline,
        StaffPassortInline,
        StaffPhoneInline,
        StaffAppearanceInline,
        StaffReferenceInline,
        StaffHealthInline,
        StaffVettingInline,
    )

admin.site.register(Staff, StaffAdmin)
