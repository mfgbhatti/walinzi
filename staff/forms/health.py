from django.forms import ModelForm
from staff.models import StaffHealth

class StaffHealthForm(ModelForm):
	class Meta:
		model = StaffHealth
		fields = "__all__"