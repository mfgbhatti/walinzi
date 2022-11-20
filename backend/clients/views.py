"""views"""
from rest_framework import viewsets
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import Client
from .serializers import ClientSerializer, JustClientSerializer


class ClientViewset(viewsets.ModelViewSet):
    """viewset handling everything"""
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    @action(detail=True, methods=["GET"])
    def get_just_client(self, request, pk=None):
        queryset = Client.objects.all()
        serializer_class = JustClientSerializer


