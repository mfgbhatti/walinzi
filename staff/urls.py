from django.urls import path

from staff.views import StaffListView, StaffDetailsView, StaffLicenceView

app_name = "staff"

urlpatterns = [
    path("staff/", StaffListView, name="staff_list"),
    path("staff/staff_detail/<uuid:staff_id>", StaffDetailsView, name="staff_detail"),
    path("staff/staff_detail/<uuid:staff_id>/licence_details/", StaffLicenceView, name="staff_licence_details"),
]
