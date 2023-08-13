from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.contrib import messages
from django.contrib.auth import get_user_model
# from django.contrib.auth import update_session_auth_hash

Users = get_user_model()

@login_required()
def change_password_view(request):
    user_email = request.user.email
    user = Users.objects.get(email=user_email)
    if request.method == "POST":
        old_password = request.POST.get("password1")
        new_password = request.POST.get("password3")

        user_authenicated = authenticate(email=user_email, password=old_password)

        if user_authenicated is None:
            messages.error(request, "Incorrect old password")
            return redirect("accounts:user_profile")
            # render(request, "accounts/profile.html")

        else:
            user.set_password(new_password)
            user.save()
            messages.success("Your password is changed")
            return redirect("accounts:user_logout")

    return redirect("accounts:user_profile")