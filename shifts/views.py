from datetime import datetime, timedelta
from django.utils import timezone
from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from shifts.models import Shift
from shifts.forms import ShiftForm
from sites.models import Site
from staff.models import Staff


@login_required
def ShiftListView(request):
    shifts = Shift.objects.all()
    context = {}

    sites = Site.objects.filter(customer=request.user.customer)
    guards = Staff.objects.filter(customer=request.user.customer)
    shift_form = ShiftForm(request.POST or None)

    if request.method == "POST":
        if shift_form.is_valid():
            site_id = request.POST["site"]
            staff_ids = request.POST.getlist("staff")
            time_in = datetime.strptime(request.POST["time_in"], "%H:%M").time()
            time_out = datetime.strptime(request.POST["time_out"], "%H:%M").time()
            started = datetime.strptime(request.POST["started"], "%Y-%m-%d").date()
            ended = datetime.strptime(request.POST["ended"], "%Y-%m-%d").date()
            delta = ended - started

            for i in range(delta.days + 1):
                date = started + timedelta(days=i)

                # Create Shift
                shift = Shift.objects.create(
                    site_id=site_id,
                    time_in=timezone.datetime.combine(date, time_in),
                    time_out=timezone.datetime.combine(date, time_out),
                )

                if staff_ids:
                    shift.staff.set(staff_ids)

                shift.save()
    # for time input
    hours = range(24)
    minutes = ["00", "15", "30", "45"]
    context.update(
        {
            "shifts_active": "active",
            "shifts": shifts,
            "sites": sites,
            "guards": guards,
            "shift_form": shift_form,
            "hours": hours,
            "minutes": minutes,
            "errors": shift_form.errors,
        }
    )
    response = render(request, "shifts/list.html", context)
    return response
