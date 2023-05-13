"""
views for customer
"""
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.decorators import login_required

from customers.models import Customer
from customers.forms import CreateCustomerForm


# Create your views here.
@login_required
def CustomerList(request):
    """list for customers"""
    customers = Customer.objects.all()
    template = loader.get_template("customers/index.html")
    context = {
        'user.is_authenticated': 'request.user.is_authenticated',
        'customers': customers
    }

    return HttpResponse(template.render(context, request))

@login_required
def CreateCustomerView(request):
    context = {}
    form = CreateCustomerForm(request.POST or None)
    template = loader.get_template("customers/index.html")
    if form.is_valid:
        form.save()
    context['form'] = form
    context['success'] = True
    return HttpResponse(template.render(request, context['success']))
