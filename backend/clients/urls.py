from django.urls import path, re_path

from . import views

urlpatterns = [
  path('all', views.all),
  path('search/<uuid:pk>', views.search)
]