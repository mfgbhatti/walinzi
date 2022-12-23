"""urls configs"""

from django.urls import path

from backend.users.views.configs import AppConfigViewSet

urlpatterns = [
    path("configs/", AppConfigViewSet.as_view({"get": "list", "post": "create", "put": "update", "delete": "destroy"})),
]