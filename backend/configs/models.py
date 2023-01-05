"""User configs model."""
from django.db import models

from backend.users.models import BaseUser as User


class AppConfig(models.Model):
    """User configs model."""
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="config", null=True, blank=True)
    layout = models.CharField(max_length=25, default="")
    scheme = models.CharField(max_length=25, default="")
    theme = models.CharField(max_length=25, default="")

    class Meta:
        """Meta options."""

        db_table = "user_config"

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

