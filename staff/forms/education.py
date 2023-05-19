from django.forms import ModelForm
from staff.models import StaffEducation

class StaffEducationForm(ModelForm):
	class Meta:
		model = StaffEducation
		fields = "__all__"