from django.http import HttpResponse
from datetime import datetime
from django.utils import timezone
from django.contrib.auth.decorators import login_required

from shifts.models import Shift
from shifts.forms import ShiftForm
from sites.models import Site


@login_required
def ShiftUpdateView(request, shift_id):

    shift = Shift.objects.get(pk=shift_id)

    shift_form = ShiftForm(request.POST or None, instance=shift)

    if request.method == "POST":
        if shift_form.is_valid():
            site = Site.objects.get(pk=request.POST["site"])
            staff_ids = request.POST.getlist("staff")
            time_in = datetime.strptime(request.POST["time_in"], "%H:%M").time()
            time_out = datetime.strptime(request.POST["time_out"], "%H:%M").time()
            started = datetime.strptime(request.POST["started"], "%Y-%m-%d").date()
            ended = datetime.strptime(request.POST["ended"], "%Y-%m-%d").date()


            if staff_ids:
                shift.staff.set(staff_ids)
            shift.site = site
            shift.time_in = timezone.make_aware(datetime.combine(started, time_in))
            shift.time_out = timezone.make_aware(datetime.combine(ended, time_out))

            shift.save()
            return HttpResponse(status=200)
        return HttpResponse(status=302)
    return HttpResponse(status=500)


