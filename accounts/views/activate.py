"""
activate user view
"""
from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required

from accounts.forms import CreatePasswordForm

User = get_user_model()


@login_required
def ActivateUserView(request):
    context = {}
    return render(request, "accounts/activate.html", context)
