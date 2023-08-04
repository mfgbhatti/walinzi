from django import forms
from django.contrib.auth import get_user_model
from accounts.models import UserProfile

Users = get_user_model()


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ["title", "phone", "about", "avatar"]

    def clean_avatar(self):
        # Validate the uploaded avatar file
        avatar = self.cleaned_data.get("avatar")
        if avatar:
            allowed_extensions = ["jpg", "jpeg", "png"]
            ext = avatar.name.split(".")[-1].lower()
            if ext not in allowed_extensions:
                raise forms.ValidationError(f'Invalid file format. Allowed extensions: {", ".join(allowed_extensions)}')
            if avatar.size > 5 * 1024 * 1024:  # 5 MB (you can adjust the size as needed)
                raise forms.ValidationError("File size exceeds the limit (5 MB).")
        return avatar


class UserForm(forms.ModelForm):
    class Meta:
        model = Users
        fields = (
            "first_name",
            "last_name",
        )
