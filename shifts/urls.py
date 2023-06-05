from django.urls import path

from shifts.views import ShiftListView, GetShiftDatatableView

app_name = "shifts"

urlpatterns = [
    path("shifts/", ShiftListView, name="shift_list"),
    path("get_shifts/", GetShiftDatatableView, name="get_shifts"),
]
