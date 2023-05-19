from django.forms import ModelForm
from staff.models import StaffPassort

class StaffPassortForm(ModelForm):
	class Meta:
		model = StaffPassort
		fields = "__all__"