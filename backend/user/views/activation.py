from rest_framework.decorators import api_view
from rest_framework.response import Response

from backend.user.serializers import SetUserPasswordSerializer
from backend.user.models import MyBaseUser as User


@api_view(["GET", "POST"])
def activation_view(request):
    """TODO: implement brute force check"""
    if request.method == "POST":
        user_id = request.data.get("user_id")
        activation_key = request.data.get("activation_key")
        password = request.data.get("password")

        try:
            user = User.objects.get(id=user_id)
            serializer = SetUserPasswordSerializer(data=request.data)
            if user.activation_key == activation_key:
                if serializer.is_valid():
                    user.set_password(password)
                    user.activation_key = None
                    user.activation_link = None
                    user.save()
                else:
                    return Response({"success": False})
            else:
                return Response({"success": False})
        except User.DoesNotExist:
            return Response({"success": False})
        return Response({"success": False})

    elif request.method == "GET":
        user_id = request.query_params["user_id"]
        activation_key = request.query_params["activation_key"]
        user = User.objects.get(id=user_id)
        if user.activation_key == activation_key:
            return Response({"success": True})
        else:
            return Response({"success": False})
