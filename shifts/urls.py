from django.urls import path

from shifts.views import ShiftListView

app_name = "shifts"

urlpatterns = [path("shifts/", ShiftListView, name="shift_list")]
