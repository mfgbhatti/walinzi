"""
activate new user
"""
from django import forms

class CreatePasswordForm(forms.ModelForm):
    password1 = forms.CharField(widget=forms.PasswordInput())
    password2 = forms.CharField(widget=forms.PasswordInput())