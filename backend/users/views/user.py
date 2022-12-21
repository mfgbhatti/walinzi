"""views for user"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from backend.users.models import BaseUser as User
from backend.users.serializers.user import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """viewset for user model"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """get queryset"""
        return User.objects.filter(id=self.request.user.id)

    def perform_create(self, serializer):
        """perform create"""
        serializer.save(customer=self.request.user.customer)

    def perform_update(self, serializer):
        """perform update"""
        serializer.save(customer=self.request.user.customer)

    def perform_destroy(self, instance):
        """perform destroy"""
        instance.is_active = False
        instance.save()