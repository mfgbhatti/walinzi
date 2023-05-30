from django.forms import ModelForm
from staff.models import StaffLicence


class StaffLicenceForm(ModelForm):
    class Meta:
        model = StaffLicence
        fields = ("licence_no",)
