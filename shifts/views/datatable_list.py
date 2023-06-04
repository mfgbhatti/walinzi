from django.shortcuts import render
from django.http import JsonResponse
from django.core.serializers import serialize
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from shifts.models import Shift
from sites.models import Site
from staff.models import Staff


@login_required
def GetShiftDatatableView(request):
    context = {}

    user_customer = request.user.customer.id
    sites = Site.objects.filter(client__customer=user_customer)
    shifts = Shift.objects.filter(site__in=sites)
    guards = Staff.objects.filter(customer=user_customer)

    # for time input
    hours = range(24)
    minutes = ["00", "15", "30", "45"]
    context.update(
        {
            "shifts_active": "active",
            "shifts": shifts,
            "sites": sites,
            "guards": guards,
            "hours": hours,
            "minutes": minutes,
        }
    )
    response = render(request, "shifts/datatable_list.html", context)
    return response
