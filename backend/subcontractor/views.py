from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from backend.subcontractor.models import Subcontractor
from backend.subcontractor.serializers import SubcontractorSerializer


class SubcontractorViewSet(viewsets.ModelViewSet):
    queryset = Subcontractor.objects.all()
    serializer_class = SubcontractorSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def get_queryset(self):
        # Get the user making the request
        user = self.request.user
        queryset = Subcontractor.objects.none()
        if user.is_superuser:
            client_id = self.request.query_params.get("client_id")
            if client_id:
                return Subcontractor.objects.filter(client_id=client_id)
            else:
                return Subcontractor.objects.all()

        # Check if the user is authenticated and has a client attribute
        if user.is_authenticated and hasattr(user, "client"):
            client = user.client

            # Check if the client is not available
            if client is None:
                return queryset
            # Filter the Subcontractor queryset based on the client
            queryset = Subcontractor.objects.filter(client=client)

            # # You may add additional filtering logic here if needed
            # # For example, filtering based on subcontractor client, if that's a separate field
            # subcontractor_client = self.request.query_params.get("subcontractor_client")
            # if subcontractor_client:
            #     queryset = queryset.filter(subcontractor_client=subcontractor_client)
            #
            return queryset
        else:
            # If the user is not authenticated or does not have a client attribute, return an empty queryset
            return queryset
