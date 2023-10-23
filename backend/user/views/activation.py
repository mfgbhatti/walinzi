from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status

from backend.user.serializers import SetUserPasswordSerializer, UserSerializer
from backend.user.models import MyBaseUser as User
from backend.user.utils import generate_activation_key, is_activation_key_valid


@api_view(["GET", "POST"])
@permission_classes(
    [
        AllowAny,
    ]
)
def user_activation_view(request):
    """
    No authentication
    Need to send json data
    Both GET and POST requests are allowed
    because front end will check if activation key is valid in GET request
    then redirect to set password and POST on that request
    """
    if request.method == "POST":
        user_id = request.data.get("user_id")
        _activation_key = request.data.get("activation_key")
        password = request.data.get("password")
        try:
            user = User.objects.get(id=user_id)
            serializer = SetUserPasswordSerializer(data=request.data)
            if user.activation_key == _activation_key:
                if is_activation_key_valid(user.activation_key):
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
                # If user's activation key is expired
                else:
                    return Response(
                        data={"success": False},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    )
            else:
                return Response(
                    data={"success": False},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        except User.DoesNotExist:
            return Response(
                data={"success": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == "GET":
        user_id = request.query_params.get("user_id")
        _activation_key = request.query_params.get("activation_key")
        user = User.objects.get(id=user_id)
        if user.activation_key == _activation_key:
            if is_activation_key_valid(user.activation_key):
                return Response(data={"success": True}, status=status.HTTP_200_OK)
            return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"success": False}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def regenerate_key(request):
    """
    Expecting data to be json
    """
    if request.method == "POST":
        user = request.user
        """TODO: validate user superuser or has permissions"""
        user_id = request.data.get("user_id")
        _activation_key = request.data.get("activation_key")
        try:
            user_to_be_changed = User.objects.get(id=user_id)
            serializer = UserSerializer(user_to_be_changed)
            if user_to_be_changed.activation_key == _activation_key:
                if not is_activation_key_valid(user_to_be_changed.activation_key):
                    new_key = generate_activation_key()
                    user_to_be_changed.activation_key = new_key
                    user_to_be_changed.activation_link = (
                        f"/user/activate/{user_id}/{new_key}"
                    )
                    user_to_be_changed.save()
                    return Response(status=status.HTTP_202_ACCEPTED, data={"user": serializer.data})
                return Response(status=status.HTTP_200_OK, data={"user": serializer.data})
        except User.DoesNotExist as error:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    return Response(status=status.HTTP_400_BAD_REQUEST)
