from django.forms import ModelForm
from staff.models import StaffPhone

class StaffPhoneForm(ModelForm):
	class Meta:
		model = StaffPhone
		fields = "__all__"