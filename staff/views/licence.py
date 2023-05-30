"""
getting licence details
"""
from django.http import HttpResponse
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from datetime import datetime

from staff.models import Staff, StaffLicence
from staff.forms import StaffLicenceForm
from staff.utils import SiaSearchComponent


@login_required
def StaffLicenceView(request, staff_id):
    staff = Staff.objects.get(id=staff_id)
    try:
        licence = StaffLicence.objects.get(staff=staff_id)
    except StaffLicence.DoesNotExist:
        licence = None

    form = StaffLicenceForm(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            sia_search = SiaSearchComponent()
            licence_no = request.POST.get("licence_no")
            licence = form.save(commit=False)
            result = sia_search.submit(licence_no=licence_no)  # get data from sia on the licence number
            my_list = (
                "registered",
                "expiry_date",
            )
            for key in my_list:
                date_str = result.get(key)

                try:
                    date_value = datetime.strptime(date_str, "%d %B %Y").date()  # change date format
                except ValueError:
                    date_value = None

                if date_value is not None:
                    result[key] = date_value.strftime("%Y-%m-%d")
                else:
                    result[key] = None

            licence_data = model_to_dict(licence)
            licence_data.update(result)
            licence = StaffLicence(**licence_data)
            licence.staff = staff
            licence.save()
            # print(result)
            return redirect("staff:staff_detail", staff_id)
    return HttpResponse("get request not valid")
