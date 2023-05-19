from django.forms import ModelForm
from staff.models import StaffContact

class StaffContactForm(ModelForm):
	class Meta:
		model = StaffContact
		fields = "__all__"