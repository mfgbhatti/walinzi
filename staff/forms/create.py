from django.forms import ModelForm

from staff.models import Staff


class StaffCreateForm(ModelForm):
    class Meta:
        model = Staff
        exclude = ("id",)
