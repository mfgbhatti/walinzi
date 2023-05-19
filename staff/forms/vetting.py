from django.forms import ModelForm
from staff.models import StaffVetting

class StaffVettingForm(ModelForm):
	class Meta:
		model = StaffVetting
		fields = "__all__"