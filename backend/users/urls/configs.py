"""urls configs"""

from django.urls import path

from ..views import AppConfigViewSet

urlpatterns = [
    path("configs/", AppConfigViewSet.as_view({"get": "list", "post": "create", "put": "update", "delete": "destroy"})),
]