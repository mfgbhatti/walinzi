from django.urls import path

from backend.client.views import ClientViewSet


urlpatterns = [
    path("all/", ClientViewSet.as_view({"get": "list"})),
    path("get_client/<uuid:pk>/", ClientViewSet.as_view({"get": "retrieve"})),
    path("create/", ClientViewSet.as_view({"post": "create"})),
    path("search/<uuid:pk>/", ClientViewSet.as_view({"get": "retrieve"})),
    path("update/<uuid:pk>/", ClientViewSet.as_view({"put": "update"})),
    path("delete/<uuid:pk>/", ClientViewSet.as_view({"delete": "destroy"})),
]
