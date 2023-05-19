"""
address
"""
from django import forms
from clients.models import ClientAddress
class ClientAddressForm(forms.ModelForm):
    """client address"""

    # street = forms.CharField(
    #     required=True,
    #     widget=forms.widgets.TextInput(
    #         attrs={"class": "form-control", "id": "floatingInput", "placeholder": "Street"}
    #     ),
    #     max_length=150,
    # )

    class Meta:
        model = ClientAddress
        fields = "__all__"
