"""
create user
"""

from django import forms
from django.contrib.auth import get_user_model

Users = get_user_model()


class CreateUserForm(forms.ModelForm):
    class Meta:
        model = Users
        fields = (
            "email",
            "first_name",
            "last_name",
        )
