from django.forms import ModelForm

from shifts.models import Shift


class ShiftForm(ModelForm):
    class Meta:
        model = Shift
        exclude = ("name", "time_in", "time_out")

