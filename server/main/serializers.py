from rest_framework import serializers
from .models import User, UserGroup


class GroupSerializer(serializers.ModelSerializer):
    users = serializers.PrimaryKeyRelatedField(queryset=UserGroup.objects.all(), many=True)

    class Meta:
        model = UserGroup
        fields = (
            'id',
            'name',
            'users',
            'status'
        )


class UserSerializer(serializers.ModelSerializer):
    user_groups = GroupSerializer(many=True, read_only=True)

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
            'is_active',
            'user_groups'
        )
