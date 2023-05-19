"""details"""

from django import forms

from clients.models import ClientDetail

class ClientDetailForm(forms.ModelForm):
    """client details"""

    class Meta:
        model = ClientDetail
        fields = "__all__"
