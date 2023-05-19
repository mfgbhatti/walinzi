from django.forms import ModelForm
from staff.models import StaffDetail

class StaffDetailForm(ModelForm):
	class Meta:
		model = StaffDetail
		fields = "__all__"