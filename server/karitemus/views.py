from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from django.core import serializers
from django.contrib.auth.middleware import get_user
from main.models import CustomUser


@csrf_exempt
@api_view(['POST'])
def check_token(request):
    print(request.user, request.auth, request.data)
    user = Token.objects.filter(key=request.data['token'])
    print(user[0].user)
    token = user.exists()
    if not token:
        return JsonResponse({"status": "TOKEN_NOTFOUND"})
    return JsonResponse({"status": "SUCCESS",
                         "user": serializers.serialize(
                            "json",
                            user
                            # CustomUser.objects.filter(id=user[0].user.id)
                           )
                         })


@csrf_exempt
@api_view(['POST'])
def delete_token(request):
    user = get_user(request)
    print(user.is_authenticated)
    Token.objects.filter(key=request.data['token']).delete()
    return JsonResponse({"status": "200"})


@csrf_exempt
@api_view(['POST'])
def get_user_by_id(request):
    user = CustomUser.objects.filter(id=request.data['id'])
    if not user.exists():
        return JsonResponse({"status": "USER_NOTFOUND"})

    return JsonResponse({"status": "SUCCESS",
                         "user": serializers.serialize(
                            "json",
                            user
                           )
                         })


def index(request):
    return render(request, 'index.html', {})
