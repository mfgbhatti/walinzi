"""
urls for customer
"""
from django.urls import path

from customers.views import customer_list_view, customer_details_view, customer_create_view, customer_json_view, \
    customer_update_view

app_name = "customers"

urlpatterns = [
    path("customers/", customer_list_view, name="customer_list"),
    path("get_customers/", customer_json_view, name="get_customers"),
    path("create_customer/", customer_create_view, name="create_customer"),
    path("update_customer/<uuid:customer_id>/", customer_update_view, name="update_customer"),
    path("get_customer/<uuid:customer_id>/", customer_details_view, name="customer_details")
]
