"""
Views for dashboard
"""
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

Users = get_user_model()


# Create your views here.
@login_required
def Dashboard(request):
    """main view"""
    user = Users.objects.get(email=request.user.email)

    if not request.user.is_superuser:
        group = Group.objects.get(user=user)
    else:
        group = None

    context = {
        "user.is_authenticated": request.user.is_authenticated,
        "dashboard_active": "active",
        "user": user,
        "group": group,
    }
    response = render(request, "dashboard/index.html", context)
    response.set_cookie(key="halfmoon_preferredMode", value="dark-mode")
    return response
