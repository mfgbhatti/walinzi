"""Navigation models"""
from django.db import models


class Navigation(models.Model):
    """base navigation model."""

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50, blank=True)

    icon = models.CharField(max_length=50, default="")

    class Meta:
        """Meta class."""

        abstract = True


class MainNavigation(Navigation):
    """Main navigation model."""
    subtitle = models.CharField(max_length=50, blank=True)
    type = models.CharField(max_length=15, default="group")
    pass

    class Meta:
        """Meta class."""

        verbose_name = "Main Navigation"
        verbose_name_plural = "Main Navigation"

    def __str__(self):
        """Return the navigation."""
        return self.title


class ChildNavigation(Navigation):
    type = models.CharField(max_length=15, blank=True, default="basic")
    main = models.ForeignKey(MainNavigation, on_delete=models.CASCADE, null=False, related_name="children")
    hidden = models.BooleanField(blank=True)
    active = models.BooleanField(default=True)
    disabled = models.BooleanField(blank=True)
    tooltip = models.CharField(max_length=50, blank=True)
    link = models.CharField(max_length=50, default="", blank=False)
    fragment = models.CharField(max_length=50, blank=True)
    preserveFragment = models.BooleanField(blank=True)
    externalLink = models.BooleanField(blank=True)
    target = models.CharField(max_length=50, blank=True)
    exactMatch = models.BooleanField(blank=True)
    meta = models.CharField(max_length=50, blank=True)

    class Meta:
        """Meta class."""

        verbose_name = "Child Navigation"
        verbose_name_plural = "Child Navigation"

    def __str__(self):
        """Return the navigation."""
        return self.title


class ChildNavigationClass(models.Model):
    """model for child navigation class."""

    navigation = models.OneToOneField(ChildNavigation, on_delete=models.CASCADE, null=False, related_name="classes")
    title = models.CharField(max_length=50, blank=True)
    subtitle = models.CharField(max_length=50, blank=True)
    icon = models.CharField(max_length=50, default="")
    wrapper = models.CharField(max_length=50, default="")


class ChildNavigationBadge(models.Model):
    """model for child navigation badge"""
    title = models.CharField(max_length=50, blank=True)
    classes = models.CharField(max_length=50, default="")
    Navigation = models.OneToOneField(ChildNavigation, on_delete=models.CASCADE, null=False, related_name="badge")