from django.contrib import admin
from .models import UserGroup, CustomUser


admin.site.register(CustomUser)
admin.site.register(UserGroup)
