from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from backend.user.serializers import SetUserPasswordSerializer
from backend.user.models import MyBaseUser as User
from backend.user.utils import generate_activation_key, is_activation_key_valid


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def user_activation_view(request):
    """
    Both GET and POST requests are allowed
    because front end will check if activation key is valid in GET request
    then redirect to set password and POST on that request
    """
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
                    return Response(
                        data={"success": True}, status=status.HTTP_201_CREATED
                    )
                else:
                    return Response(
                        data={"success": False}, status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(
                    data={"success": False}, status=status.HTTP_400_BAD_REQUEST
                )
        except User.DoesNotExist:
            return Response(data={"success": False}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "GET":
        user_id = request.query_params["user_id"]
        activation_key = request.query_params["activation_key"]
        user = User.objects.get(id=user_id)
        if user.activation_key == activation_key:
            return Response(data={"success": True}, status=status.HTTP_200_OK)
        else:
            return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def regenerate_key(request):
    if request.method == "POST":
        user = request.user
        """TODO: validate user superuser or has permissions"""
        user_id = request.data.get("user_id")
        activation_key = request.data.get("activation_key")

        user_to_be_changed = User.objects.get(id=user_id)
        if user_to_be_changed.activation_key == activation_key:
            if not is_activation_key_valid(activation_key):
                new_key = generate_activation_key()
                user_to_be_changed.activation_key = new_key
                user_to_be_changed.activation_link = (
                    f"/user/activate/{user_id}/{new_key}"
                )
                user_to_be_changed.save()
                return Response(status=status.HTTP_202_ACCEPTED)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(status=status.HTTP_400_BAD_REQUEST)
