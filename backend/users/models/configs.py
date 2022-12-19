"""User configs model."""
import uuid
from django.db import models

from .users import BaseUser as User


class AppConfig(models.Model):
    """User configs model."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="config", null=True, blank=True)
    layout = models.CharField(max_length=25, default="")
    scheme = models.CharField(max_length=25, default="")
    theme = models.CharField(max_length=25, default="")

    class Meta:
        """Meta options."""

        verbose_name = "App config"
        verbose_name_plural = "App configs"

    def __str__(self):
        """Return username."""
        # if self.user is not None or self.user != "":
        #     return str(self.user.username+ " " +self.theme)
        return str(self.theme)

    def get_default_config(self):
        """check if user is blank or null. then return default config."""
        if self.user is None or self.user == "":
            return self

class Screens(models.Model):
    """screens model."""

    app_config = models.ForeignKey(AppConfig, on_delete=models.CASCADE, related_name="screens")
    sm = models.CharField(max_length=25, default="")
    md = models.CharField(max_length=25, default="")
    lg = models.CharField(max_length=25, default="")
    xl = models.CharField(max_length=25, default="")


    class Meta:
        """Meta options."""

        verbose_name = "Screen"
        verbose_name_plural = "Screens"

class Themes(models.Model):
    """themes model."""
    app_config = models.ForeignKey(AppConfig, on_delete=models.CASCADE, related_name="themes")
    id = models.CharField(max_length=25, default="", primary_key=True)
    name = models.CharField(max_length=25, default="")

    class Meta:
        """Meta options."""

        verbose_name = "Theme"
        verbose_name_plural = "Themes"

