"""
address
"""
from django import forms
from customers.models import CustomerAddress
class CustomerAddressForm(forms.ModelForm):
    """customer address"""

    # street = forms.CharField(
    #     required=True,
    #     widget=forms.widgets.TextInput(
    #         attrs={"class": "form-control", "id": "floatingInput", "placeholder": "Street"}
    #     ),
    #     max_length=150,
    # )

    class Meta:
        model = CustomerAddress
        fields = "__all__"
