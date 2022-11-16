from django.urls import path

from . import views

urlpatterns = [
  path('all', views.all),
  path('create', views.create),
  path('search/<uuid:pk>', views.search),
  path('update/<uuid:pk>', views.update),
  path('delete/<uuid:pk>', views.delete)
]