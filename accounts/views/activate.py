"""
activate user view
"""
from django.shortcuts import render, get_object_or_404,redirect
from django.contrib.auth import get_user_model

from accounts.utils import is_activation_key_valid

Users = get_user_model()


def ActivateUserView(request, pk, key):
    user = get_object_or_404(Users, pk=pk)
    expiration_time = is_activation_key_valid(key)
    print(key)

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
                    return redirect("accounts:login")
                else:
                    error_msg = "Passwords do not match. Please try again."
                    return render(request, 'accounts/activate.html', {'error_msg': error_msg})
            else:
                return render(request, "accounts/activate.html", context)
        else:
            return redirect("dashboard:index")
    else:
        error_msg = "Passwords do not match. Please try again."
        return render(request, "accounts/expired.html", {'error_msg': error_msg})
    error_msg = "Passwords do not match. Please try again."
    return render(request, "accounts/expired.html", {'error_msg': error_msg})



