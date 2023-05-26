from django.contrib.auth.views import LoginView


class UserLoginView(LoginView):
    redirect_authenticated_user = True
    template_name = "accounts/login.html"

    def form_valid(self, form):
        # Call the parent class's form_valid method to perform the default behavior
        response = super().form_valid(form)

        # Set the cookie in the response
        response.set_cookie(key="halfmoon_preferredMode", value="dark-mode")

        return response


# def UserLoginView(request):
#     if request.user.is_authenticated:
#         return redirect("dashboard:index")

#     if request.method == "POST":
#         next = request.POST.get("next")
#         username = request.POST.get("username")
#         password = request.POST.get("password")
#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user)

#         else:
#             form = AuthenticationForm()
#             response = render(request, "accounts/login.html", {"form": form})
#             response.set_cookie(key="halfmoon_preferredMode", value="dark-mode")
#             return response
#     else:
#         form = AuthenticationForm()
#         response = render(request, "accounts/login.html", {"form": form})
#         response.set_cookie(key="halfmoon_preferredMode", value="dark-mode")
#         return response
