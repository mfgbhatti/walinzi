"""
views for site
"""
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

# from django.contrib.auth.models import Group

from sites.models import Site
from clients.models import Client
from sites.forms import CreateSiteForm

Users = get_user_model()


# @permission_required
@login_required
def SiteList(request):
    """list for sites"""
    # groups = Group.objects.all().order_by("name")
    # group = groups.filter(user=request.user, name="admin").first()

    user = Users.objects.get(email=request.user.email)
    form = CreateSiteForm(request.POST or None)

    sites = Site.objects.filter(customer=user.customer).order_by("name")
    clients = Client.objects.filter(customer=user.customer).order_by("name")

    if request.method == "POST":
        if form.is_valid:
            site = form.save(commit=False)
            site.customer = user.customer
            client_id = request.POST.get("client")
            site.client = clients.get(id=client_id)
            site.save()
            return redirect("sites:site_list")

    context = {
        "user.is_authenticated": request.user.is_authenticated,
        "sites": sites,
        "clients": clients,
        "form": form,
        "is_authed": "True",
        "sites_active": "active",
    }

    return render(request, "sites/list.html", context)
