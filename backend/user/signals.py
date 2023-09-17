from django.dispatch import receiver
from django.db.models.signals import pre_save, post_delete

from backend.user.models import MyBaseUser as Users


@receiver(pre_save, sender=Users)
def save_user(sender, instance, *args, **kwargs):
    """Save the username"""
    if instance.first_name and instance.last_name:
        if not instance.username:
            first_name = instance.first_name
            last_name = instance.last_name
            instance.username = first_name + last_name[0]
    else:
        pass
