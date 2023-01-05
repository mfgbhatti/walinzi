"""urls configs"""

from django.urls import path

from .views import AppConfigViewSet

urlpatterns = [
    path("configs/", AppConfigViewSet.as_view({"get": "list",})),
    path("configs/create/", AppConfigViewSet.as_view({"post": "create",})),
    path("configs/get/<int:pk>/", AppConfigViewSet.as_view({"get": "retrieve"})),
    path("configs/update/<int:pk>/", AppConfigViewSet.as_view({"put": "update"})),
    path("configs/delete/<int:pk>/", AppConfigViewSet.as_view({"delete": "destroy"})),
]