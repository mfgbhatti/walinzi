from django.forms import ModelForm
from staff.models import StaffReference

class StaffReferenceForm(ModelForm):
	class Meta:
		model = StaffReference
		fields = "__all__"