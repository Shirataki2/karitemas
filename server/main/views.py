from rest_framework import generics
from rest_framework.permissions import IsAdminUser,IsAuthenticated, AllowAny
from .models import User, UserGroup
from .serializers import UserSerializer, GroupSerializer


class UserListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        queryset = User.objects.filter(pk=self.kwargs['id'])
        return queryset


class GroupListAPIView(generics.ListAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = GroupSerializer
    queryset = UserGroup.objects.all()
