"""Admin configurations for users app."""
from django.contrib import admin

from ..models import AppConfig, Screens, Themes

class ScreensInline(admin.TabularInline):
    """Screens admin."""
    model = Screens
    extra = 0

class ThemesInline(admin.TabularInline):
    """Themes admin."""
    model = Themes
    extra = 0

class AppConfigAdmin(admin.ModelAdmin):
    """App config admin."""
    inlines = [ScreensInline, ThemesInline]

admin.site.register(AppConfig, AppConfigAdmin)