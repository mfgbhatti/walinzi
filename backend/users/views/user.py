"""views for user"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from backend.users.models import BaseUser as User
from backend.users.serializers.user import UserSerializer, UserListSerializer

class UserViewSet(viewsets.ModelViewSet):
    """viewset for user model"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """get queryset"""
        return User.objects.filter(id=self.request.user.id)

    def list(self, request, format=None):
        """list"""
        instance = request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class UserListViewSet(viewsets.ModelViewSet):
    """viewset for users model"""
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """get queryset"""
        user = self.request.user
        if user.groups.filter(name="admin").exists():
            return User.objects.filter(customer=self.request.user.customer)
        return User.objects.filter(id=self.request.user.id)

class UserByCustomerViewSet(viewsets.ModelViewSet):
    """viewset for users from customer"""
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    permission_classes = (IsAuthenticated,IsAdminUser,)

    def get_queryset(self):
        """get queryset"""
        return User.objects.filter(customer=self.kwargs["pk"])
    # def list(self, request, pk=None):
    #     """list"""
    #     queryset = User.objects.all()
    #     users = get_object_or_404(queryset, customer=pk)
    #     serializer = UserListSerializer(users, ma)
    #     permission_classes = (IsAuthenticated,IsAdminUser,)
    #     return Response(serializer.data)
