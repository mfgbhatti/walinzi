from django.urls import path

from .views import ClientViewset


urlpatterns = [
  path('all', ClientViewset.as_view({'get': 'list'})),
  path('get_client', ClientViewset.as_view({'get': 'get_just_client'})),
  path('create', ClientViewset.as_view({'post': 'create'})),
  path('search/<uuid:pk>', ClientViewset.as_view({'get': 'retrieve'})),
  path('update/<uuid:pk>', ClientViewset.as_view({'put': 'update'})),
  path('delete/<uuid:pk>', ClientViewset.as_view({'delete': 'destroy'}))
]