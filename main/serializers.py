from rest_framework import serializers
from .models import User, UserGroup


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'password',
            'last_login',
            'username',
            'is_superuser',
            'last_name',
            'first_name',
            'email',
            'is_staff',
            'is_active'
        )


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGroup
        fields = (
            'id',
            'name',
            'users'
        )
