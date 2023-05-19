from django.forms import ModelForm
from staff.models import StaffAppearance

class StaffAppearanceForm(ModelForm):
	class Meta:
		model = StaffAppearance
		fields = "__all__"