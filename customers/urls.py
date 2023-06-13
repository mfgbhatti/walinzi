"""
urls for customer
"""
from django.urls import path

from customers.views import CustomerList, CustomerDetailsView, CustomerCreateView, CustomerJsonView, CustomerUpdateView

app_name = "customers"

urlpatterns = [
    path("customers/", CustomerList, name="index"),
    path("get_customers/", CustomerJsonView, name="get_customers"),
    path("create_customer/", CustomerCreateView, name="create_customer"),
    path("update_customer/<uuid:customer_id>/", CustomerUpdateView, name="update_customer"),
    path("get_customer/<uuid:customer_id>/", CustomerDetailsView, name="customer_details")
]


