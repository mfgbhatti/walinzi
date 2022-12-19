"""User models."""
import uuid
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager as BUM
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from .customers import Customer


class BaseUserManager(BUM):
    """Base user manager."""

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email.lower())
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.full_clean()
        user.save(self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        user = self.create_user(
            email=email, password=password, is_admin=True
        )

        user.is_superuser = True
        user.save(using=self._db)
        return user


class BaseUser(AbstractUser, PermissionsMixin):
    """Base user model."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="company",
        null=True,
        blank=True,
    )
    email = models.EmailField(max_length=255, verbose_name="email address", unique=True)
    username = models.CharField(max_length=80, default="", blank=True, null=True)
    first_name = models.CharField(max_length=80, default="", blank=True, null=True)
    last_name = models.CharField(max_length=80, default="", blank=True, null=True)
    avatar = models.CharField(max_length=210, default="", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = BaseUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        """Does the user have a specific permission?"""
        return True

    def has_module_perms(self, app_label):
        """Does the user have permissions to view the app `app_label`?"""
        return True

    @property
    def is_staff(self):
        """Is the user a member of staff?"""
        return self.is_admin
