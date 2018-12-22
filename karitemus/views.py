from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.authtoken.models import Token


@csrf_exempt
@api_view(['POST'])
def check_token(request):
    token = Token.objects.filter(key=request.data['token']).exists()
    if not token:
        return JsonResponse({"status": "TOKEN_NOTFOUND"})
    return JsonResponse({"status": token})


@csrf_exempt
@api_view(['POST'])
def delete_token(request):
    Token.objects.filter(key=request.data['token']).delete()
    return JsonResponse({"status": "200"})


def index(request):
    return render(request, 'index.html', {})
