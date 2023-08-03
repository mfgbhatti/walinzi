from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required

from accounts.models import UserProfile

User = get_user_model()


@login_required
def ProfileView(request):
    user = User.objects.get(email=request.user.email)

    if request.method == "POST":
        print(request.POST)
    titles = ("mr", "mrs", "miss", "other")
    context = {
        "user": user,
        "titles": titles,
    }
    return render(request, "accounts/profile.html", context)
