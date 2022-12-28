"""Navigation models."""
from django.contrib.auth.models import Group
from django.db import models


class Navigation(models.Model):
    """Navigation item model."""

    TYPE_CHOICES = (
        ("aside", "Aside"),
        ("basic", "Basic"),
        ("collapsable", "Collapsable"),
        ("divider", "Divider"),
        ("group", "Group"),
        ("spacer", "Spacer"),
    )

    TARGET_CHOICES = (
        ("_blank", "Blank"),
        ("_self", "Self"),
        ("_parent", "Parent"),
        ("_top", "Top"),
    )
    id = models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    icon = models.CharField(max_length=255, default="")
    link = models.CharField(max_length=255, blank=True)
    type = models.CharField(max_length=255, choices=TYPE_CHOICES)
    children = models.ForeignKey("self", blank=True, on_delete=models.CASCADE, default="", null=True)
    visible_to = models.ForeignKey(Group, blank=True, on_delete=models.CASCADE, default="",null=True)
    hidden = models.BooleanField(default=False)
    active = models.BooleanField(default=False)
    disabled = models.BooleanField(default=False)
    tooltip = models.CharField(max_length=255, blank=True)
    fragment = models.CharField(max_length=255, blank=True)
    preserve_fragment = models.BooleanField(default=False)
    query_params = models.TextField(blank=True)
    query_params_handling = models.CharField(max_length=255, blank=True)
    external_link = models.BooleanField(default=False)
    target = models.CharField(max_length=255, blank=True, choices=TARGET_CHOICES)
    exact_match = models.BooleanField(default=False)
    is_active_match_options = models.TextField(blank=True)
    function = models.TextField(blank=True)
    classes = models.TextField(blank=True)
    badge = models.TextField(blank=True)
    meta = models.TextField(blank=True)

    def __str__(self):
        return self.title

    class Meta:
        """Meta options."""

        db_table = "navigations"
        verbose_name = "Navigation Item"
        verbose_name_plural = "Navigation Items"
