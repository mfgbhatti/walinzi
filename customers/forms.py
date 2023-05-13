"""
create a customer form
"""
from django.forms import ModelForm

from customers.models import Customer


class CreateCustomerForm(ModelForm):
    """form for customer"""

    class Meta:
        model = Customer

        fields = ("name",)
