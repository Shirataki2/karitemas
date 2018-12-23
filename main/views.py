from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import User, Group
from .serializers import UserSerializer, GroupSerializer


class UserListAPIView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    queryset = User.objects.all()


class GroupListAPIView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
