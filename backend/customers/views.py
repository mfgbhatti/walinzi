"""viewsets for customer"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Customer
from .serializers import CustomerSerializer, CustomerListSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    """Customer viewset."""

    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

class CustomerListViewSet(viewsets.ModelViewSet):
    """Customer list viewset."""

    queryset = Customer.objects.all()
    serializer_class = CustomerListSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
