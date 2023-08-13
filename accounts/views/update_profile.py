from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model

from accounts.models import UserProfile
from accounts.forms import UserProfileForm, UserForm

Users = get_user_model()


@login_required
def update_profile_view(request):
    """Update a user profile"""
    user = Users.objects.get(pk=request.user.id)
    profile = None
    try:
        profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        pass

    if request.method == "POST":
        user_form = UserForm(request.POST, instance=user)
        profile_form = UserProfileForm(request.POST, request.FILES, instance=profile)
        if profile_form.is_valid() and user_form.is_valid():
            update_user = user_form.save(commit=False)
            update_user.first_name = request.POST.get("first_name")
            update_user.last_name = request.POST.get("last_name")
            update_user.save()
            if profile:
                profile_form.save()
            else:
                new_profile = profile_form.save(commit=False)
                new_profile.user = user
                new_profile.title = request.POST.get("title", "")
                new_profile.phone = request.POST.get("phone", "")
                new_profile.about = request.POST.get("about", "")
                new_profile.avatar = request.FILES.get("avatar", "")
                new_profile.save()
            return redirect("accounts:user_profile")

    return redirect("accounts:user_profile")
