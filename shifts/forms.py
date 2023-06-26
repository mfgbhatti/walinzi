from django.forms import Form, CharField, TimeField, DateField

from shifts.models import Shift


class ShiftForm(Form):
    site = CharField(required=True)
    time_in = TimeField(required=True)
    time_out = TimeField(required=True)
    started = DateField(required=True)
    ended = DateField(required=True)

    class Meta:
        model = Shift
        exclude = ("name", "is_active")
class ShiftUpdateForm(Form):
    site = CharField(required=True)
    time_in = TimeField(required=True)
    time_out = TimeField(required=True)
    started = DateField(required=True)

    class Meta:
        model = Shift
        exclude = ("name", "is_active")
