from django.urls import path

from staff.views import StaffListView, StaffDetailsView

app_name = "staff"

urlpatterns = [
    path("staff/", StaffListView, name="staff_list"),
    path("staff/staff_detail/<uuid:staff_id>", StaffDetailsView, name="staff_detail"),
]
