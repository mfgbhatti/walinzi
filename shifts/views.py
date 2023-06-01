from datetime import datetime, timedelta
from django.utils import timezone
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from shifts.models import Shift
from shifts.forms import ShiftForm
from sites.models import Site
from staff.models import Staff


@login_required
def ShiftListView(request):
    customer = request.user.customer
    shifts = Shift.objects.filter(site__customer=customer)
    context = {}

    sites = Site.objects.filter(customer=customer)
    guards = Staff.objects.filter(customer=customer)
    shift_form = ShiftForm(request.POST or None)

    def create_shift(start_date, end_date):
        """create a shift"""
        shift = Shift.objects.create(
            site_id=site_id,
            time_in=timezone.make_aware(datetime.combine(start_date, time_in)),
            time_out=timezone.make_aware(datetime.combine(end_date, time_out)),
        )
        if staff_ids:
            shift.staff.set(staff_ids)

        shift.save()

    if request.method == "POST":
        if shift_form.is_valid():
            site_id = request.POST["site"]
            staff_ids = request.POST.getlist("staff")
            time_in = datetime.strptime(request.POST["time_in"], "%H:%M").time()
            time_out = datetime.strptime(request.POST["time_out"], "%H:%M").time()
            started = datetime.strptime(request.POST["started"], "%Y-%m-%d").date()
            ended = datetime.strptime(request.POST["ended"], "%Y-%m-%d").date()

            delta = ended - started
            if delta.days == 1:  # for one day
                create_shift(started, ended)
            else:
                for i in range(delta.days + 1):
                    date = started + timedelta(days=i)
                    create_shift(date, date)

            messages.success(request, "New shift is created.")

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
