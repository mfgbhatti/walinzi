"""
urls for site
"""
from django.urls import path

from sites.views import SiteList, SiteDetailsView

app_name = "sites"

urlpatterns = [
    path("sites/", SiteList, name="index"),
    path("get_site/<uuid:site_id>", SiteDetailsView, name="site_details"),
]
