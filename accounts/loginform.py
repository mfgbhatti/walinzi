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
        widget=forms.TextInput(attrs={"class": "form-control", "id": "floatingInput", "placeholder": "you@email.com"})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={"class": "form-control", "id": "floatingPassword", "placeholder": "Password"})
    )

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
