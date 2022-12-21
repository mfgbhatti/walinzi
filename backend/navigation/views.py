from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import MainNavigation

from .serializers import NavigationSerializer

class NavigationViewSet(viewsets.ModelViewSet):
    """Navigation viewset."""

    serializer_class = NavigationSerializer
    permission_classes = (IsAuthenticated,)
    queryset = MainNavigation.objects.all()