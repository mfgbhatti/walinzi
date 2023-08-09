from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

from accounts.models import UserProfile
from accounts.forms import UserProfileForm, UserForm

Users = get_user_model()


@login_required
def UpdateProfileView(request):
    """Update a user profile"""
    user = Users.objects.get(pk=request.user.id)
    profile = UserProfile.objects.get_or_create(user=user)

    if request.method == "POST":
        user_form = UserForm(request.POST, instance=user)
        profile_form = UserProfileForm(request.POST, request.FILES, instance=profile)
        if profile_form.is_valid() and user_form.is_valid():
            user_form.save()
            profile_form.save()
            return redirect("accounts:user_profile")

    return redirect("accounts:user_profile")
