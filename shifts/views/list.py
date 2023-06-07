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
    # variabl dictionery for template
    var_dict = {}
    var_dict["get_url"] = reverse("shifts:get_shifts")
    var_dict["post_url"] = reverse("shifts:create_shift")
    var_dict["table_id"] = "shifts"
    var_dict["modal_id"] = "add_shift_modal"
    var_dict["form_id"] = "shift_form"

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
            "var_dict": var_dict,
        }
    )
    response = render(request, "shifts/datatable_list.html", context)
    return response
