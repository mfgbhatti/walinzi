"""
urls for client
"""
from django.urls import path

from clients.views import ClientList, ClientDetailsView

app_name = "clients"

urlpatterns = [
    path("clients/", ClientList, name="client_list"),
    path("clients/client_detail/<uuid:client_id>", ClientDetailsView, name="client_details")
]


