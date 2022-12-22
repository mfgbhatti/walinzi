"""views for user"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.users.models import BaseUser as User
from backend.users.serializers.user import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """viewset for user model"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """get queryset"""
        if self.request.user.is_superuser:
            return User.objects.all()
        else:
            return User.objects.filter(customer=self.request.user.customer)

    def list(self, request, format=None):
        """list"""
        instance = request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
class UsersViewSet(viewsets.ModelViewSet):
    """viewset for users model"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """get queryset"""
        if self.request.user.is_superuser:
            return User.objects.all()
        else:
            return User.objects.filter(customer=self.request.user.customer)
