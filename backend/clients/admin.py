"""admin settings"""
from django.contrib import admin
from .models import Client, Note, PhoneNumber, Email, ClientDetail


# class DetailInline(NestedTabularInline):
#     model = ClientDetail
# class NoteInline(NestedTabularInline):
#     model = Note
# class EmailInline(NestedTabularInline):
#     model = Email
# class PhoneNumberInline(NestedTabularInline):
#     model = PhoneNumber

# class ClientNestedModelAdmin(NestedModelAdmin):
#     inlines = [DetailInline]
#     inlines = [EmailInline]
#     inlines = [PhoneNumberInline]
#     inlines = [NoteInline]





# admin.site.register(Client, ClientNestedModelAdmin)
admin.site.register(Client)
admin.site.register(ClientDetail)
admin.site.register(PhoneNumber)
admin.site.register(Email)
admin.site.register(Note)
