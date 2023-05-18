"""
create a client form
"""
from django import forms

from clients.models import Client


class CreateClientForm(forms.ModelForm):
    """form for client"""

    name = forms.CharField(
        required=True,
        widget=forms.widgets.TextInput(
            attrs={"class": "form-control", "id": "floatingInput", "placeholder": "Client Name"}
        ),
    )

    class Meta:
        model = Client

        exclude = (id,)

