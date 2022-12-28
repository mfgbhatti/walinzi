"""Navigation views."""
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Navigation

from .serializers import NavigationSerializer


class NavigationViewSet(viewsets.ModelViewSet):
    """Navigation viewset."""

    serializer_class = NavigationSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Get queryset."""
        user_groups = self.request.user.groups.all()
        return Navigation.objects.filter(visible_to__in=user_groups).prefetch_related("children")

    def get_serializer(self, *args, **kwargs):
        kwargs["fields"] = ("id", "title", "link", "children")
        return super().get_serializer(*args, **kwargs)

    def list(self, request, format=None):
        """List."""
        queryset = self.get_queryset()  # get all navigation items
        serializer = NavigationSerializer(queryset, many=True)
        return Response(
            {
                "compact": serializer.data,
                "default": serializer.data,
                "futuristic": serializer.data,
                "horizontal": serializer.data,
            }
        )
