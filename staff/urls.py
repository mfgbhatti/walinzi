from django.urls import path

from staff.views import StaffListView, StaffDetailsView, StaffLicenceView

app_name = "staff"

urlpatterns = [
    path("staff/", StaffListView, name="index"),
    path("get_staff/<uuid:staff_id>", StaffDetailsView, name="staff_detail"),
    path("get_staff_licence/<uuid:staff_id>/", StaffLicenceView, name="staff_licence_details"),
]
