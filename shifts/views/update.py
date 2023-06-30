from django.http import JsonResponse
from datetime import datetime, timedelta, date
from django.contrib.auth.decorators import login_required

from shifts.models import Shift
from shifts.forms import ShiftUpdateForm
from sites.models import Site


@login_required
def ShiftUpdateView(request, shift_id):
    shift = Shift.objects.get(pk=shift_id)

    shift_form = ShiftUpdateForm(request.POST)

    if request.method == "POST":
        if shift_form.is_valid():
            site = Site.objects.get(pk=request.POST["site"])
            # staff_ids = request.POST.getlist("staff")
            time_in = datetime.strptime(request.POST["time_in"], "%H:%M").time()
            time_out = datetime.strptime(request.POST["time_out"], "%H:%M").time()
            started = datetime.strptime(request.POST["started"], "%Y-%m-%d").date()
            finish = datetime.combine(date.today(), time_out)
            start = datetime.combine(date.today(), time_in)
            if finish < start:
                ended = started + timedelta(days=1)
            else:
                ended = started

            # if staff_ids:
            #     shift.staff.set(staff_ids)
            shift.site = site
            shift.time_in = datetime.combine(started, time_in)
            shift.time_out = datetime.combine(ended, time_out)
            shift.is_active = True

            shift.save()
            return JsonResponse({"success": True}, status=201)
        return JsonResponse({"success": False}, status=400)
    return JsonResponse({"success": False}, status=500)
