from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from backend.customer.models import Customer
from backend.customer.serializers import CustomerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    authentication_classes = [IsAuthenticated]
