"""details"""

from django import forms

from customers.models import CustomerDetail


class CustomerDetailForm(forms.ModelForm):
    """customer details"""

    class Meta:
        model = CustomerDetail
        fields = "__all__"
