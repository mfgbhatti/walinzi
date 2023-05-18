"""
address
"""
from django import forms
from sites.models import SiteAddress
class SiteAddressForm(forms.ModelForm):
    """site address"""

    # street = forms.CharField(
    #     required=True,
    #     widget=forms.widgets.TextInput(
    #         attrs={"class": "form-control", "id": "floatingInput", "placeholder": "Street"}
    #     ),
    #     max_length=150,
    # )

    class Meta:
        model = SiteAddress
        fields = "__all__"
