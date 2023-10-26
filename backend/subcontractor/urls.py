from django.urls import path

from backend.subcontractor.views import SubcontractorViewSet


urlpatterns = [
    path("all/", SubcontractorViewSet.as_view({"get": "list"})),
    path("get/<pk>/", SubcontractorViewSet.as_view({"get": "retrieve"})),
    path("create/", SubcontractorViewSet.as_view({"post": "create"})),
    path("search/<pk>/", SubcontractorViewSet.as_view({"get": "retrieve"})),
    path("update/<pk>/", SubcontractorViewSet.as_view({"put": "update"})),
    path("delete/<pk>/", SubcontractorViewSet.as_view({"delete": "destroy"})),
]
