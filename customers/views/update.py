"""
views for customer
"""
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from customers.models import Customer
from customers.forms import CreateCustomerForm


# @permission_required
@login_required
def customer_update_view(request, customer_id=None):
    customer = Customer.objects.get(id=customer_id)
    if request.user.is_superuser:
        form = CreateCustomerForm(request.POST or None, instance=customer)
        if request.method == "POST":
            print(request.POST)
            if form.is_valid:
                form.save()
            return HttpResponse(status=200)
        return HttpResponse(status=500)
    else:
        return HttpResponse(status=403)
