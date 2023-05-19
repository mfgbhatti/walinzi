"""
views for customer
"""
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from customers.models import Customer
from customers.forms import CreateCustomerForm


# @permission_required
@login_required
def CustomerList(request):
    """list for customers"""
    context = {
        "user.is_authenticated": request.user.is_authenticated,
    }
    if request.user.is_superuser:
        form = CreateCustomerForm(request.POST or None)
        customers = Customer.objects.all().order_by("name")
        if request.method == "POST":
            if form.is_valid:
                form.save()
                return redirect("customers:customer_list")

        context.update(
            {
                "customers": customers,
                "form": form,
                "is_authed": "True",
                "customers_active": "active",
            }
        )

        return render(request, "customers/list.html", context)
    else:
        return render(request, "500.html", context)
