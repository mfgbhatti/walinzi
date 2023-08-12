"""
other customer details
"""
from django import forms

from customers.models import CustomerPhone, CustomerEmail, CustomerNotes


class CustomerPhoneForm(forms.ModelForm):
    """Customer phones"""

    class Meta:
        model = CustomerPhone
        fields = "__all__"

class CustomerEmailForm(forms.ModelForm):
    """Customer emails"""

    class Meta:
        model = CustomerEmail
        fields = "__all__"

class CustomerNoteForm(forms.ModelForm):
    """Customer notes"""

    class Meta:
        model = CustomerNotes
        fields = "__all__"
