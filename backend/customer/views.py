from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from backend.customer.models import Customer
from backend.customer.serializers import CustomerSerializer


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_queryset(self):
        # Get the user making the request
        user = self.request.user
        queryset = Customer.objects.none()
        if user.is_superuser:
            client_id = self.request.query_params.get("client_id")
            if client_id:
                return Customer.objects.filter(client_id=client_id)
            else:
                return Customer.objects.all()

        # Check if the user is authenticated and has a client attribute
        if user.is_authenticated and hasattr(user, "client"):
            client = user.client

            # Check if the client is not available
            if client is None:
                return queryset
            # Filter the Customer queryset based on the client
            queryset = Customer.objects.filter(client=client)

            # # You may add additional filtering logic here if needed
            # # For example, filtering based on customer client, if that's a separate field
            # customer_client = self.request.query_params.get("customer_client")
            # if customer_client:
            #     queryset = queryset.filter(customer_client=customer_client)
            #
            return queryset
        else:
            # If the user is not authenticated or does not have a client attribute, return an empty queryset
            return queryset
