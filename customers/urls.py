"""
urls for customer
"""
from django.urls import path

from customers.views import CustomerList

urlpatterns = [
    path("customers/", CustomerList)
]


