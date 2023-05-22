from django.forms import Form, CharField, PasswordInput


class ActivateForm(Form):
    password1 = CharField(
        label="Password",
        widget=PasswordInput(attrs={"class": "form-control mb-2", "id": "floatingInput", "placeholder": "Password"}),
    )
    password2 = CharField(
        label="Confirm password",
        widget=PasswordInput(
            attrs={"class": "form-control mb-2", "id": "floatingInput", "placeholder": "Confirm password"}
        ),
    )

