from django.urls import path

from ..views import shortcuts as views


urlpatterns = [
    path(
        "shortcuts/",
        views.UserShortcutsView.as_view({"get": "list", "post": "create"}),
        name="shortcuts",
    ),
    path(
        "shortcuts/<int:pk>/",
        views.UserShortcutsView.as_view({"get": "retrieve","put": "update", "delete": "destroy"}),
        name="shortcuts",
    ),
]
