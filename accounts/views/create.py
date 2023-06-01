"""
create user view
"""
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.urls import reverse_lazy

from accounts.forms import CreateUserForm
from accounts.utils import generate_activation_key

from customers.models import Customer

Users = get_user_model()


@login_required
def UserListView(request, customer_id):
    """create new user"""
    groups = Group.objects.all().order_by("name")

    admin = groups.filter(user=request.user, name="admin").first()
    if admin or request.user.is_superuser:
        customer = Customer.objects.get(pk=customer_id)
        user_form = CreateUserForm(request.POST or None)

        try:
            users = Users.objects.filter(customer=customer_id)
        except Users.DoesNotExist:
            users = None

        if request.method == "POST":
            # print(request.POST)
            if user_form.is_valid:
                user_group = request.POST.get("groups")
                user = user_form.save(commit=False)
                user.customer = customer
                user.set_unusable_password()
                user.activation_key = generate_activation_key()
                user.activation_link = reverse_lazy(
                    "accounts:activate_user", kwargs={"pk": user.pk, "key": user.activation_key}
                )
                user.save()
                group = Group.objects.get(id=user_group)
                group.user_set.add(user)
                redirect("accounts:create_user", customer_id)

        context = {"users": users, "form": user_form, "groups": groups, "group": admin}
        return render(request, "accounts/list.html", context)
    else:
        return render(request, "403.html", {"error_msg": "403"})
