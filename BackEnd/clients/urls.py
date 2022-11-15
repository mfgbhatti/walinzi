from django.urls import path, re_path

from . import views

urlpatterns = [
  path('', views.index, name='index'),
  path('all', views.all),
  path('search/<uuid:pk>', views.search)
]
    # re_path(r'^search/(?P<pk>[0-9a-z]+)$', views.search)
