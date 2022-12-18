"""Users defined shortcuts."""
from django.db import models

from .users import BaseUser as User


class UserShortcuts(models.Model):
    """User shortcuts."""

    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, related_name="shortcuts")
    id = models.AutoField(primary_key=True)
    label = models.CharField(max_length=50, null=False, default="")
    description = models.CharField(max_length=100, null=False, default="")
    icon = models.CharField(max_length=50, null=False, default="")
    link = models.CharField(max_length=100, null=False, default="")
    useRouter = models.BooleanField(default=False)

    class Meta:
        """Meta class."""

        db_table = "user_shortcuts"
        verbose_name = "User shortcut"
        verbose_name_plural = "User shortcuts"

    def __str__(self):
        """Return the shortcut."""
        return self.label
