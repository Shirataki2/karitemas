import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    class Meta:
        db_table = 'user'
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)


class UserGroup(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    STATUS_PRIVATE = "private"
    STATUS_PUBLIC = "public"
    STATUS = (
        (STATUS_PRIVATE, "Private"),
        (STATUS_PUBLIC, "Public")
    )
    name = models.CharField(max_length=32)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        choices=STATUS,
        default=STATUS_PRIVATE,
        max_length=30
    )
    users = models.ManyToManyField(
        CustomUser,
        related_name="user_groups"
    )


class Config(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    avatar = models.ImageField(
        upload_to='images/',
        default='https://pbs.twimg.com/profile_images/1076916401061879808/8-GIsbaN.jpg'
    )
