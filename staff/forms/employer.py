from django.forms import ModelForm
from staff.models import StaffEmployer

class StaffEmployerForm(ModelForm):
	class Meta:
		model = StaffEmployer
		fields = "__all__"