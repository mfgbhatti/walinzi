"""
Views for dashboard
"""
from django.shortcuts import render
from django.contrib.auth.decorators import login_required


# Create your views here.
@login_required
def Dashboard(request):
    """main view"""

    context = {
        "user.is_authenticated": request.user.is_authenticated,
        "dashboard_active": "active"
    }
    return render(request, "dashboard/index.html", context)
