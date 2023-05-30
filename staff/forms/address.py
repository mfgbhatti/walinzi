from django.forms import ModelForm
from staff.models import StaffAddress

class StaffAddressForm(ModelForm):
    class Meta:
        model = StaffAddress
        exclude = ("staff",)