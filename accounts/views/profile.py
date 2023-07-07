from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required

from accounts.models import UserProfile

User = get_user_model()


@login_required
def ProfileView(request):
    user = User.objects.get(email=request.user.email)

    context = {
        'user': user,
    }
    return render(request, "accounts/profile.html", context)
