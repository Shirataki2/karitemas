from rest_framework import generics
from rest_framework.permissions import IsAdminUser
from .models import User, UserGroup
from .serializers import UserSerializer, GroupSerializer


class UserListAPIView(generics.ListAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = UserSerializer
    queryset = User.objects.all()


class GroupListAPIView(generics.ListAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = GroupSerializer
    queryset = UserGroup.objects.all()
