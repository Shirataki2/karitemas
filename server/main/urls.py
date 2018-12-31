from django.urls import path
from .views import UserListAPIView, GroupListAPIView, UserAPIView

urlpatterns = [
    path('user/<pk>', UserAPIView.as_view()),
    path('groups/', GroupListAPIView.as_view()),
]
