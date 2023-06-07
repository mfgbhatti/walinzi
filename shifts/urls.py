from django.urls import path

from shifts.views import ShiftListView, ShiftJsonView, ShiftCreateUpdateView

app_name = "shifts"

urlpatterns = [
    path("shifts/", ShiftListView, name="index"),
    path("get_shifts/", ShiftJsonView, name="get_shifts"),
    path("get_shift/<uuid:shift_id>", ShiftListView, name="get_shift"),
    path("create_shift/", ShiftCreateUpdateView, name="create_shift"),
    path("update_shift/<uuid:shift_id>", ShiftListView, name="update_shift"),
]
