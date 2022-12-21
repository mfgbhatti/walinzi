from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import MainNavigation

from .serializers import NavigationSerializer


class NavigationViewSet(viewsets.ModelViewSet):
    """Navigation viewset."""

    serializer_class = NavigationSerializer
    permission_classes = (IsAuthenticated,)
    queryset = MainNavigation.objects.all()

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
