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
    context = {
        "redirect_url": "accounts:user_logout",
        "redirct_wait": 5000
    }
    if request.method == "POST":
        old_password = request.POST.get("password1")
        confirmed_password = request.POST.get("password2")
        new_password = request.POST.get("password3")

        if confirmed_password == new_password:
            messages.error(request, "Passwords are not matching")

        user_authenicated = authenticate(email=user_email, password=old_password)

        if user_authenicated is None:
            messages.error(request, "Incorrect old password")
            return redirect("accounts:user_profile")
            # render(request, "accounts/profile.html")

        else:
            user.set_password(new_password)
            user.save()
            messages.success(request, "Your password is changed")
            return redirect("accounts:user_logout")
            # return render(request, "redirect.html", context)

    return redirect("accounts:user_profile")