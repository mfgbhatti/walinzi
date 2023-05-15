"""
create user view
"""
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.urls import reverse_lazy

from accounts.forms import CreateUserForm
from accounts.utils import generate_activation_key, is_activation_key_valid

from customers.models import Customer

Users = get_user_model()


@login_required
def CreateUserView(request, customer_id):
    try:
        users = Users.objects.filter(customer=customer_id)
    except Users.DoesNotExist:
        users = None

    customer = Customer.objects.get(pk=customer_id)

    user_form = CreateUserForm(request.POST or None)

    if request.method == "POST":
        if user_form.is_valid:
            user = user_form.save(commit=False)
            user.customer = customer
            user.set_unusable_password()
            user.activation_key = generate_activation_key(user.email)
            user.activation_link = reverse_lazy("accounts:activate_user", kwargs={"pk": user.pk, "key": user.activation_key})
            user.save()
            redirect("accounts:create_user", customer_id)
    context = {
        "users": users,
        "form": user_form,
    }
    print(users)
    return render(request, "accounts/create.html", context)
