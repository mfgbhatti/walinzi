"""
views for customer
"""
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from customers.models import Customer
from customers.forms import CreateCustomerForm


# Create your views here.
@login_required
def CustomerList(request):
    """list for customers"""

    form = CreateCustomerForm(request.POST or None)
    customers = Customer.objects.all()
    if request.method == "POST":
        if form.is_valid:
            form.save()
            return redirect("customers:customer_list")

    context = {
        "user.is_authenticated": request.user.is_authenticated,
        "customers": customers,
        "customers_active": "active",
        "form": form,
    }

    return render(request, "customers/index.html", context)

