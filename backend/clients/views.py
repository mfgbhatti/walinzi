from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Client
from .serializers import ClientSerializer


@api_view(["GET"])
def all(request):
    result = ClientSerializer(Client.objects.all(), many=True).data
    return JsonResponse(result, safe=False, status=status.HTTP_200_OK)


@api_view(["GET"])
def search(request, pk):
    try:
        result = Client.objects.get(pk=pk)
    except Client.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)

    serilized_data = ClientSerializer(result, many=False).data
    return JsonResponse(serilized_data, safe=False, status=status.HTTP_200_OK)


@api_view(["POST"])
def create(request):
    data = JSONParser().parse(request)
    serializer = ClientSerializer(data=data).data
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer, status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
def update(request, pk):
    try:
        result = Client.objects.get(pk=pk)
    except Client.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)

    data = JSONParser().parse(request)
    serializer = ClientSerializer(result, data=data).data
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer, safe=False, status=status.HTTP_202_ACCEPTED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete(request, pk):
    try:
        result = Client.objects.get(pk=pk)
    except Client.DoesNotExist:
        return JsonResponse(status=status.HTTP_404_NOT_FOUND)

    result.delete()
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)
