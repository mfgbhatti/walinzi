"""
create a site form
"""
from django import forms

from sites.models import Site


class CreateSiteForm(forms.ModelForm):
    """form for site"""

    class Meta:
        model = Site

        exclude = (id,)
