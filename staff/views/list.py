from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

from staff.models import Staff
from staff.forms import StaffCreateForm

Users = get_user_model()


@login_required
def StaffListView(request):
    user = Users.objects.get(email=request.user.email)
    guards = Staff.objects.filter(customer=user.customer)
    form = StaffCreateForm(request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            staff = form.save(commit=False)
            staff.customer = user.customer
            staff.save()
            return redirect("staff:staff_list")

    context = {
        "user.is_authenticated": request.user.is_authenticated,
        "staff_active": "active",
        "guards": guards,
        "form": form
    }

    return render(request, "staff/list.html", context)
