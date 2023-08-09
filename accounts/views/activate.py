"""
activate user view
"""
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import get_user_model

from accounts.utils import is_activation_key_valid

Users = get_user_model()


def activate_user_view(request, pk, key):
    user = get_object_or_404(Users, pk=pk)
    expiration_time = is_activation_key_valid(key)

    context = {}
    if request.user.is_authenticated:
        return redirect("dashboard:index")

    if expiration_time:
        if user.activation_key == key:
            if request.method == "POST":
                password1 = request.POST.get("password1")
                password2 = request.POST.get("password2")
                if password1 == password2:
                    user.set_password(password1)
                    user.activation_key = None
                    user.activation_link = None
                    user.save()
                    return redirect("accounts:user_login")
                else:
                    error_msg = "Please make sure your passwords match."
                    error_msg_heading = "Password error"
                    context.update({"error_msg_heading": error_msg_heading, "error_msg": error_msg})
                    return render(request, "accounts/activate.html", context)
            else:
                response = render(request, "accounts/activate.html", context)
                response.set_cookie(key="halfmoon_preferredMode", value="dark-mode")
                return response
        else:
            error_msg = (
                "Please make sure your activation link is valid one, contact your business administrator for further "
                "information."
            )
            error_msg_heading = "Invalid link"
            context.update({"error_msg_heading": error_msg_heading, "error_msg": error_msg})
            return render(request, "accounts/expired.html", context)
    else:
        error_msg = ("This activation link is expired. Please contact your business administrator for further "
                     "information.")
        error_msg_heading = "Expired link"
        context.update({"error_msg_heading": error_msg_heading, "error_msg": error_msg})
        return render(request, "accounts/expired.html", context)
