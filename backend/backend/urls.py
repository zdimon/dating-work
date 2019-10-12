from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token 

from account.views import InitApp
from online.views import UserOnline 
from page.views import index
from .settings import MEDIA_ROOT, MEDIA_URL, DEBUG

from rest_framework import routers
from account.views import UserProfileViewSet, UserViewSet, CheckEmail, RegisterMan
from photo.views import *
from .rootrouter import RootRouter
from rest_framework.authtoken import views
from room.views import RoomViewSet

router = RootRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', UserProfileViewSet)
router.register(r'room', RoomViewSet)
 
from account.auth import CustomAuthToken, LogoutView
from backend.celery_view import CeleryTaskView

urlpatterns = [
    path('', include(router.urls)),
    path('rosetta/', include('rosetta.urls')),
    path('photos/', include('photo.urls')),
    path('i18n/', include('trans.urls')),
    path('room/', include('room.urls')),
    path('settings/', include('settings.urls')),
    path('online/', include('online.urls')),
    path('message/', include('mailbox.urls')),
    path('webrtc/', include('webrtc.urls')),
    path('account/', include('account.urls')),
    path('props/', include('props.urls')),
    path('gallery/', include('gallery.urls')),
    path('admin/', admin.site.urls),
    path('admin/ajax/', include('grappelli_extras.ajax_urls')),
    path('admin/extras/', include('grappelli_extras.extras_urls')),
    #path(r'api-token-auth/', obtain_jwt_token),
    #path(r'api-token-refresh/', refresh_jwt_token),
    path(r'api-token-auth/', CustomAuthToken.as_view()),
    path(r'init/', InitApp.as_view()),
    path(r'logout/', LogoutView.as_view(),name='user-logout'),
    path(r'check/email', CheckEmail.as_view()),
    path(r'register/man', RegisterMan.as_view(),name='register-man'),
    path(r'celery/task', CeleryTaskView.as_view(),name='celery-task'),
    path('grappelli/', include('grappelli.urls')),
]  
if DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT)