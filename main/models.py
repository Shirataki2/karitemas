from django.db import models
from django.contrib.auth.models import User


class UserGroup(models.Model):
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
        User,
        null=True
    )
