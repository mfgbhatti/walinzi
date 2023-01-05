"""Navigation views."""
import copy
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
        return Navigation.objects.filter(visible_to__in=user_groups, parent=None).prefetch_related("children")

    def list(self, request):
        """List."""
        queryset = self.get_queryset()  # get all navigation items
        serializer = NavigationSerializer(queryset, many=True)
        compact = copy.deepcopy(serializer.data)
        futuristic = copy.deepcopy(serializer.data)
        for key in compact:
            key["type"] = "aside"
            key["tooltip"] = key["title"]

        for key in futuristic:
            key["title"] = key["title"].upper()
        return Response(
            {
                "compact": compact,
                "default": serializer.data,
                "futuristic": futuristic,
                "horizontal": serializer.data,
            }
        )
