"""
create a customer form
"""
from django import forms

from customers.models import Customer


class CreateCustomerForm(forms.ModelForm):
    """form for customer"""

    name = forms.CharField(
        required=True,
        widget=forms.widgets.TextInput(
            attrs={"class": "form-control", "id": "floatingInput", "placeholder": "Customer Name"}
        ),
    )

    class Meta:
        model = Customer

        exclude = (id,)

