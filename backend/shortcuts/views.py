"""views for shortcuts"""
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from .models import UserShortcuts
from .serializers import UserShortcutsSerializer


class UserShortcutsView(viewsets.ModelViewSet):
    """User shortcuts view."""

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserShortcutsSerializer
    queryset = UserShortcuts.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        query_set = queryset.filter(user=self.request.user)
        return query_set

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     shortcut_data = serializer.validated_data
    #     shortcut_data['user'] = request.user
    #     serializer.save(**shortcut_data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)

    # def retrieve(self, request, pk=None):
    #     queryset = self.get_queryset()
    #     shortcut = queryset.get(pk=pk)
    #     serializer = self.get_serializer(shortcut)
    #     return Response(serializer.data)

    # def update(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data)
