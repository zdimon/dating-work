from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializer import serialize_list
# Create your views here.
from rest_framework.views import APIView

class MessageListView(APIView):
    """
       Add room or return existed
    """
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        return Response(serialize_list(request))