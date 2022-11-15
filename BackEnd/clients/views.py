from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Client
from .serializers import ClientSerializer


def index(request):
    return HttpResponse("")

@api_view(['GET'])
def all(request):
  if request.method == 'GET':
    result = ClientSerializer(Client.objects.all(), many=True)
    return JsonResponse(result.data, safe=False, status=status.HTTP_200_OK)
  else:
    serializer = ClientSerializer(data=request.data)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def search(request, pk):
  try:
    result = Client.objects.get(pk=pk)
  except Client.DoesNotExist:
      return JsonResponse(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'GET':
    serilized_data = ClientSerializer(result)
    return JsonResponse(serilized_data.data, safe=False, status=status.HTTP_200_OK)
  else:
    serializer = ClientSerializer(data=request.data)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create(request):
  if request.method == 'POST':
    data = JSONParser().parse(request)
    serializer = ClientSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  else:
    serializer = ClientSerializer(data=request.data)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update(request, pk):
  try:
    result = Client.objects.get(pk=pk)
  except Client.DoesNotExist:
    return JsonResponse(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'PUT':
    data = JSONParser().parse(request)
    serializer = ClientSerializer(result, data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_202_ACCEPTED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  else:
    serializer = ClientSerializer(data=request.data)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete(request, pk):
  try:
    result = Client.objects.get(pk=pk)
  except Client.DoesNotExist:
    return JsonResponse(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'DELETE':
    result.delete()
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)
  else:
    serializer = ClientSerializer(data=request.data)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
