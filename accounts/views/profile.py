from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required

from accounts.models import UserProfile

User = get_user_model()


@login_required
def profile_view(request):
    user = User.objects.get(email=request.user.email)

    titles = ("mr", "mrs", "miss", "other")
    context = {
        "user": user,
        "titles": titles,
    }
    return render(request, "accounts/profile.html", context)
