from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

from shifts.models import Shift
from shifts.forms import ShiftForm
from shifts.utils import CreateShift


@login_required
def ShiftCreateView(request):
    # user_customer = request.user.customer.id
    # sites = Site.objects.filter(client__customer=user_customer)
    # shifts = Shift.objects.filter(site__in=sites)

    shift_form = ShiftForm(request.POST or None)

    if request.method == "POST":
        # print(request.POST)
        if shift_form.is_valid():
            CreateShift(request=request, model=Shift)
            return JsonResponse({"success": True}, status=201)
        return JsonResponse({"success": False}, status=400)
    return JsonResponse({"success": False}, status=500)
