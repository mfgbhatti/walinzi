"""views for user"""
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import Group
from backend.users.models import BaseUser as User
from backend.users.serializers.user import (
    UserSerializer,
    UserListSerializer,
    CreateUserSerializer,
    UpdateUserSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    """viewset for user model"""

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """get queryset"""
        return User.objects.filter(id=self.request.user.id)

    def list(self, request):
        """list"""
        instance = request.user
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CreateUserViewSet(viewsets.ModelViewSet):
    """viewset for user model"""

    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        def create_user(data):
            name_data = data.get("name")
            if name_data:
                names = name_data.split(" ")
                data["first_name"] = " ".join(names[:-1])
                data["last_name"] = names[-1]
                data["username"] = names[0] + "".join(names[-1].strip()[0])
                del data["name"]
            data["is_active"] = False
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()

            # Assign user to group
            group_data = data.get("groups", [])
            if len(group_data) == 1:
                group_name = group_data[0]["name"]
                group = Group.objects.get(name=group_name)
                user.groups.add(group)
            if user:
                return True
            else:
                return False

        user = request.user
        if user.is_superuser or user.groups.filter(name="admin").exists():
            """create"""
            success = create_user(request.data)
            if success:
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "You don't have permission / not valid"}, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserViewSet(viewsets.ModelViewSet):
    """viewset for user model"""

    queryset = User.objects.all()
    serializer_class = UpdateUserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """get queryset"""
        user = self.request.user
        user_pk = self.kwargs["pk"]
        if user.is_superuser:
            return User.objects.filter(id=user_pk)
        elif user.customer.id == User.objects.get(id=user_pk).customer.id and user.groups.filter(name="admin").exists():
            return User.objects.filter(id=user_pk)
        return User.objects.filter(id=self.request.user.id)

    def update(self, request, pk=None):
        name_data = request.data.get("name")
        if name_data:
            names = name_data.split(" ")
            request.data["first_name"] = " ".join(names[:-1])
            request.data["last_name"] = names[-1]
            del request.data["name"]
        instance = self.get_queryset().get(id=pk)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            serializer.data,
        )


class DeleteUserViewSet(viewsets.ModelViewSet):
    """viewset for user model"""

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """get queryset"""
        user = self.request.user
        user_pk = self.kwargs["pk"]
        if user.is_superuser:
            return User.objects.filter(pk=user_pk)
        elif user.customer.id == User.objects.get(id=user_pk).customer.id and user.groups.filter(name="admin").exists():
            return User.objects.filter(pk=user_pk)
        return Response(
            {"error": "You don't have permission to delete user"},
            status=status.HTTP_403_FORBIDDEN,
        )


class UserByCustomerViewSet(viewsets.ModelViewSet):
    """viewset for users from customer"""

    queryset = User.objects.all()
    serializer_class = UserListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """get queryset"""
        user = self.request.user
        customer_pk = self.kwargs["pk"]
        if user.is_superuser:
            return User.objects.filter(customer__id=customer_pk)
        if user.customer.id == customer_pk and user.groups.filter(name="admin").exists():
            return User.objects.filter(customer__id=customer_pk)
        return Response(
            {"error": "You don't have permission to list users"},
            status=status.HTTP_403_FORBIDDEN,
        )
