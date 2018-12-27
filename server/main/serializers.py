from rest_framework import serializers
from .models import User, UserGroup, Config


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


class UserSerializer(serializers.HyperlinkedModelSerializer):
    user_groups = GroupSerializer(many=True, read_only=True)
    avatar = serializers.ImageField(source='config.avatar')

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
            'user_groups',
            'avatar'
        )

    def update(self, instance, validated_data):
        for attr, value in validated_data.items:
            if attr == 'image':
                image = Config.objects.get(user=instance)
                image.avatar = validated_data.get('image')['avatar']
                image.save()
            elif attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
