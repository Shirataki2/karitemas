from rest_framework import generics, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import CustomUser, UserGroup
from .serializers import UserSerializer, GroupSerializer


class UserListAPIView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

    def get_queryset(self):
        queryset = CustomUser.objects.filter(pk=self.kwargs['id'])
        return queryset


class UserAPIView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    lookup_field = 'pk'


class GroupListAPIView(generics.ListAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = GroupSerializer
    queryset = UserGroup.objects.all()
