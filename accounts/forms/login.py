"""
Form for login to customize fields
"""
from django import forms
from django.contrib.auth.forms import AuthenticationForm


class LoginForm(AuthenticationForm):
    """
    Using placeholder and id is essential
    """
    username = forms.CharField(
        widget=forms.TextInput()
    )
    password = forms.CharField(
        widget=forms.PasswordInput()
    )

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
