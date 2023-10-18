from rest_framework import viewsets

from backend.user.models import MyBaseUser as User
from backend.user.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        """TODO: Implement superuser and server side user client assessment"""
        client_id = self.request.query_params["client_id"]
        return User.objects.filter(client=client_id)
