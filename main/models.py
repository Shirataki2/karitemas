from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    STATUS_PRIVATE = "private"
    STATUS_PUBLIC = "public"
    STATUS = (
        (STATUS_PRIVATE, "非公開"),
        (STATUS_PUBLIC, "公開")
    )
    name = models.CharField(max_length=32)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(
        choices=STATUS,
        default=STATUS_PRIVATE,
        max_length=5
    )

    users = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
    )
