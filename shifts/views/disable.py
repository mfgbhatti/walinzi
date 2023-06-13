from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from shifts.models import Shift


@login_required
def ShiftDeleteView(request, shift_id):
    # remove shifts from shifts
    if request.method == "POST":
        # needs to hide that shift
        # shift = Shift.objects.filter(pk=shift_id).delete()
        shift = Shift.objects.get(pk=shift_id)
        shift.is_active = False
        shift.save()
        return HttpResponse(status=200)
    return HttpResponse(status=500)
