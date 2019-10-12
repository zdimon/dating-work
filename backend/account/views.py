from django.shortcuts import render
from .models import UserProfile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .serializers import UserProfileSerializer, UserSerializer
from rest_framework import viewsets
import json
import random
from rest_framework.authtoken.models import Token
from .utils import send_email
from settings.models import MailTemplates
from .user_serializer import user_serializer
from backend.settings import LANGUAGES
from payment.tasks import update_account_service
from moderation.utils.woman import add_woman_profile
from moderation.utils.agency import add_agency_profile


class InitApp(APIView):
    '''

    Initialization request.
    {
        'status': 0, 
        'message': 'Ok', 
        'token': token.key,
        'languges': lng,
        'user': user_serializer(request.user.userprofile),
        'users_online': uo
    }

    '''
    
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        token = Token.objects.get(user=request.user)
        if request.user.userprofile.gender=='male':
            uonline = UserProfile.objects.filter(gender='female',is_online=True)
        else:
            uonline = UserProfile.objects.filter(gender='male',is_online=True)
        uo = {}
        for u in uonline:
            uo[u.id] = user_serializer(u)
        lng = []
        for l in LANGUAGES:
            lng.append({'id': l[0], 'name': l[1]})
        return Response({
            'status': 0, 
            'message': 'Ok', 
            'token': token.key,
            'languges': lng,
            'user': user_serializer(request.user.userprofile),
            'users_online': uo
            })


def custom_jwt_response(token, user=None, request=None):

    import jwt
    jwt = jwt.decode(token, verify=False)
    profile = user.userprofile
    profile.set_online()
    return {
        'token': token,
        'token_exp': jwt['exp'],
        'is_admin': user.is_superuser,
        'username': user.username
    }


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = UserProfile.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class CheckEmail(APIView):
    """
       Initialization
    """
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        email = request.data.get("email")
        try:
            User.objects.get(email=email)
            print('Yes')
            return Response({'status': 1, 'message': 'Error!!!'})
        except:
            print('No!')
            return Response({'status': 0, 'message': 'Ok'})

        print(email)
        return Response({'status': 0, 'message': 'Ok'})





class RegisterWoman(APIView):
    """
       Woman registration
    """
    permission_classes = (AllowAny,)
    def post(self, request, format=None):
        print(request.data)
        add_woman_profile(request.data)
        return Response({'status': 0, 'message': 'Ok'})


class RegisterAgencyView(APIView):
    """
       Agency registration
    """
    permission_classes = (AllowAny,)
    def post(self, request, format=None):
        print(request.data)
        add_agency_profile(request.data)
        return Response({'status': 0, 'message': 'Ok'})


class RegisterMan(APIView):
    """
       Man registration
    """
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        password = random.randint(1111, 9999)
        email = request.data.get("email")

        # Change email_template
        tpl = MailTemplates.objects.get(alias='man-registration')
        data = [
            {'name': '{password}', 'value': '1q2w3e'}
        ]
        tpl.parse(data)
        #
        send_email(email, tpl)
        u = UserProfile()
        u.username = email
        u.email = email
        u.is_active = True
        u.set_password(password)
        u.save()
        return Response({'status': 0, 'message': 'Ok'})


class AddCretitsView(APIView):
    """
       Add credits
    """
    def post(self, request, format=None):
        pr = request.user.userprofile
        pr.account = pr.account + int(request.data['credits'])
        pr.save()
        update_account_service(pr)
        return Response(user_serializer(pr))


class SetLanguageView(APIView):
    permission_classes = (IsAuthenticated,)
    """
       Seting language
    """
    def get(self, request, language, format=None):
        profile = request.user.userprofile
        profile.language = language
        profile.save()
        return Response({'status': 0, 'message': 'ok'})


