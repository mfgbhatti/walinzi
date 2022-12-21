"""Admin configurations for users app."""
from django.contrib import admin

from ..models import AppConfig

admin.site.register(AppConfig)