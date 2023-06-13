"""
views for customer
"""
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required

from django.forms.models import model_to_dict
from customers.models import Customer


# @permission_required
@login_required
def CustomerJsonView(request):
    if request.user.is_superuser:
        """list for customers"""
        customers = Customer.objects.all().order_by("name")
        data = []
        for customer in customers:
            customer_dict = model_to_dict(customer)
            customer_dict["id"] = customer.id
            customer_dict["name"] = customer.name
            data.append(customer_dict)
        return JsonResponse({"data": data})
    else:
        return HttpResponse(status=403)
