from rest_framework import generics, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import User, UserGroup
from .serializers import UserSerializer, GroupSerializer


class UserListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        queryset = User.objects.filter(pk=self.kwargs['id'])
        return queryset


class UserAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'pk'


class GroupListAPIView(generics.ListAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = GroupSerializer
    queryset = UserGroup.objects.all()
