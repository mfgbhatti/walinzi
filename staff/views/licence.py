"""
getting licence details
"""
from datetime import datetime
from django.shortcuts import redirect, render, HttpResponse
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from django.contrib import messages

from staff.models import Staff, StaffLicence
from staff.forms import StaffLicenceForm
from staff.utils import SiaSearchComponent


@login_required
def StaffLicenceSave(request, staff_id):
    staff = Staff.objects.get(id=staff_id)
    try:
        licence = StaffLicence.objects.get(staff=staff_id)
    except StaffLicence.DoesNotExist:
        licence = None

    form = StaffLicenceForm(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            licence_no = request.POST.get("licence_no")
            licence = form.save(commit=False)
            sia_search = SiaSearchComponent()
            result = sia_search.submit(licence_no=licence_no)  # get data from sia on the licence number
            if result["error"]:
                messages.error(request, "Unfortunately there is no licences based on the data you have entered.")
                return redirect("staff:staff_detail", staff_id)
            elif result["error"] == False:
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
                messages.success(request, "Licence saved successfully")
                return redirect("staff:staff_detail", staff_id)
            else:
                messages.error(request, "Something went wrong! Please try again.")
                return redirect("staff:staff_detail", staff_id)
    return HttpResponse("Get request not valid")


@login_required
def StaffLicenceView(request):
    context = {"licence_active": "active"}
    sia_search = SiaSearchComponent()
    if request.method == "POST":
        try:
            licence_no = request.POST.get("licence_no")
            result = sia_search.submit(licence_no=licence_no)  # get data from sia on the licence number
            if result["error"]:
                messages.error(request, "Unfortunately there is no licences based on the data you have entered.")
                result = None
            elif result["error"] == False:
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
                        result[key] = date_value
                    else:
                        result[key] = None
        except Exception as e:
            result = None
        context.update({"stafflicence": result})
    return render(request, "staff/licence_details.html", context)
