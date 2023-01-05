from django.urls import path

from .views import UserShortcutsView


urlpatterns = [
    path("shortcuts/", UserShortcutsView.as_view({"get": "list"}), name="list-shortcuts",),
    path("shortcuts/create/", UserShortcutsView.as_view({"post": "create"}), name="create-shortcuts"),
    path("shortcuts/get/<int:pk>/", UserShortcutsView.as_view({"get": "retrieve"}), name="get-shortcuts"),
    path("shortcuts/update/<int:pk>/", UserShortcutsView.as_view({"put": "update"}), name="update-shortcuts"),
    path("shortcuts/delete/<int:pk>/", UserShortcutsView.as_view({"delete": "destroy"}), name="delete-shortcuts"),
]
