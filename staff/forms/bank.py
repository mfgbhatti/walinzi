from django.forms import ModelForm
from staff.models import StaffBank

class StaffBankForm(ModelForm):
	class Meta:
		model = StaffBank
		fields = "__all__"