from django.forms import ModelForm
from staff.models import StaffContract

class StaffContractForm(ModelForm):
	class Meta:
		model = StaffContract
		fields = "__all__"