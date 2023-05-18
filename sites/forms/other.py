"""
other site details
"""
from django import forms

from sites.models import SitePhone, SiteEmail, SiteNotes


class SitePhoneForm(forms.ModelForm):
    """Site phobes"""

    class Meta:
        model = SitePhone
        fields = "__all__"

class SiteEmailForm(forms.ModelForm):
    """Site phobes"""

    class Meta:
        model = SiteEmail
        fields = "__all__"

class SiteNoteForm(forms.ModelForm):
    """Site phobes"""

    class Meta:
        model = SiteNotes
        fields = "__all__"
