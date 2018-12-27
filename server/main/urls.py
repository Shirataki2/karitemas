from django.urls import path
from .views import UserListAPIView, GroupListAPIView, UserAPIView

urlpatterns = [
    path('user/<int:pk>', UserAPIView.as_view()),
    path('groups/', GroupListAPIView.as_view()),
]
