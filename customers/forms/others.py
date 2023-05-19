"""
other customer details
"""
from django import forms

from customers.models import CustomerPhone, CustomerEmail, CustomerNotes


class CustomerPhoneForm(forms.ModelForm):
    """Customer phobes"""

    class Meta:
        model = CustomerPhone
        fields = "__all__"

class CustomerEmailForm(forms.ModelForm):
    """Customer phobes"""

    class Meta:
        model = CustomerEmail
        fields = "__all__"

class CustomerNoteForm(forms.ModelForm):
    """Customer phobes"""

    class Meta:
        model = CustomerNotes
        fields = "__all__"
