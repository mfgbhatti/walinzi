from django.urls import path

from shifts.views import ShiftListView, GetShiftDatatableView

app_name = "shifts"

urlpatterns = [
    path("shifts/", ShiftListView, name="index"),
    path("get_shifts/", GetShiftDatatableView, name="get_shifts"),
    path("get_shift/<uuid:shift_id>", GetShiftDatatableView, name="get_shift"),
    path("create_shift/", GetShiftDatatableView, name="create_shift"),
    path("update_shift/<uuid:shift_id>", GetShiftDatatableView, name="update_shift"),
]
