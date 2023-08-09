"""
urls for client
"""
from django.urls import path

from clients.views import client_list_view, client_details_view

app_name = "clients"

urlpatterns = [
    path("clients/", client_list_view, name="client_list"),
    path("get_client/<uuid:client_id>", client_details_view, name="client_details")
]
