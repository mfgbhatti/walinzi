"""
views for client
"""
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

# from django.contrib.auth.models import Group

from clients.models import Client
from clients.forms import CreateClientForm

Users = get_user_model()

# @permission_required
@login_required
def ClientList(request):
    """list for clients"""
    # groups = Group.objects.all().order_by("name")
    # group = groups.filter(user=request.user, name="admin").first()

    user = Users.objects.get(email=request.user.email)
    form = CreateClientForm(request.POST or None)

    clients = Client.objects.filter(customer=user.customer)

    if request.method == "POST":
        if form.is_valid:
            client = form.save(commit=False)
            client.customer = user.customer
            client.save()
            return redirect("clients:index")

    context = {
        "user.is_authenticated": request.user.is_authenticated,
        "clients": clients,
        "form": form,
        "is_authed": "True",
        "clients_active": "active",
    }

    return render(request, "clients/list.html", context)
