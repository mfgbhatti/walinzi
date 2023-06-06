"""
urls for customer
"""
from django.urls import path

from customers.views import CustomerList, CustomerDetailsView

app_name = "customers"

urlpatterns = [
    path("customers/", CustomerList, name="index"),
    path("get_customer/<uuid:customer_id>", CustomerDetailsView, name="customer_details")
]


