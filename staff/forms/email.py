from django.forms import ModelForm
from staff.models import StaffEmail

class StaffEmailForm(ModelForm):
	class Meta:
		model = StaffEmail
		fields = "__all__"