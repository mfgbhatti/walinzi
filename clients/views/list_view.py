"""
views for client
"""
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from clients.models import Client
from clients.forms import CreateClientForm


# @permission_required
@login_required
def ClientList(request):
    """list for clients"""
    context = {
        "user.is_authenticated": request.user.is_authenticated,
    }
    if request.user.is_superuser:
        form = CreateClientForm(request.POST or None)
        clients = Client.objects.all().order_by("name")
        if request.method == "POST":
            if form.is_valid:
                form.save()
                return redirect("clients:client_list")

        context.update(
            {
                "clients": clients,
                "form": form,
                "is_authed": "True",
                "clients_active": "active",
            }
        )

        return render(request, "clients/index.html", context)
    else:
        return render(request, "500.html", context)
