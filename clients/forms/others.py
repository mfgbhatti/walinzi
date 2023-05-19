"""
other client details
"""
from django import forms

from clients.models import ClientPhone, ClientEmail, ClientNotes


class ClientPhoneForm(forms.ModelForm):
    """Client phobes"""

    class Meta:
        model = ClientPhone
        fields = "__all__"

class ClientEmailForm(forms.ModelForm):
    """Client phobes"""

    class Meta:
        model = ClientEmail
        fields = "__all__"

class ClientNoteForm(forms.ModelForm):
    """Client phobes"""

    class Meta:
        model = ClientNotes
        fields = "__all__"
