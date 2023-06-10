from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required


from sites.models import Site
from staff.models import Staff


@login_required
def ShiftListView(request):
    context = {}

    user_customer = request.user.customer.id
    sites = Site.objects.filter(client__customer=user_customer)
    guards = Staff.objects.filter(customer=user_customer)

    # for time input
    hours = range(24)
    minutes = ["00", "15", "30", "45"]
    context.update(
        {
            "shifts_active": "active",
            # "shifts": shifts,
            "sites": sites,
            "guards": guards,
            "hours": hours,
            "minutes": minutes,
            # global include varibales
        }
    )
    response = render(request, "shifts/list.html", context)
    return response
