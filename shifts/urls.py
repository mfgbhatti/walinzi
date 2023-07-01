from django.urls import path

from shifts.views import (
    ShiftListView,
    ShiftJsonView,
    ShiftUpdateView,
    ShiftCreateView,
    ShiftDeleteView,
    ShiftTimesheetListView,
    ShiftTimesheetJsonView
)


app_name = "shifts"

urlpatterns = [
    path("shifts/", ShiftListView, name="index"),
    path("get_shifts/", ShiftJsonView, name="get_shifts"),
    path("get_shift/<uuid:shift_id>/", ShiftListView, name="get_shift"),
    path("create_shift/", ShiftCreateView, name="create_shift"),
    path("update_shift/<uuid:shift_id>/", ShiftUpdateView, name="update_shift"),
    path("timesheet/", ShiftTimesheetListView, name="timesheet"),
    path("get_timesheet/", ShiftTimesheetJsonView, name="get_timesheet"),
    path("delete_shift/<uuid:shift_id>/", ShiftDeleteView, name="delete_shift"),
]
