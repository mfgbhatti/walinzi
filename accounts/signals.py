from django.dispatch import receiver
from django.db.models.signals import pre_save, post_delete

from accounts.models import BaseUser as Users, UserProfile


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


@receiver(pre_save, sender=UserProfile)
def pre_save_image(sender, instance, *args, **kwargs):
    """ instance old image file will delete from os """
    if instance.user:
        """if instance exist"""
        try:
            old_img = sender.objects.get(user=instance.user).avatar
            new_img = instance.avatar
        except:
            new_img = None
            old_img = None
        if new_img != old_img and old_img is not None:
            # import os
            # if os.path.exists(old_img.path):
            #     os.remove(old_img.path)
            old_img.delete(save=False)


@receiver(post_delete, sender=UserProfile)
def post_save_image(sender, instance, *args, **kwargs):
    """Clean old avatar when user is deleted"""
    try:
        instance.avatar.delete(save=False)
    except:
        pass
