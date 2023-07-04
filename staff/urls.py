from django.urls import path

from staff.views import StaffListView, StaffDetailsView, StaffLicenceSave, StaffLicenceView

app_name = "staff"

urlpatterns = [
    path("staff/", StaffListView, name="staff_list"),
    path("get_staff/<uuid:staff_id>", StaffDetailsView, name="staff_detail"),
    path("get_staff_licence/<uuid:staff_id>/", StaffLicenceSave, name="staff_licence_details"),
    path("sia_licence_check/", StaffLicenceView, name="sia_licence_check")

]
