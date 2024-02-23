from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from user_profile.models import UserProfile
from .serializers import UserSerializer
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect
from django.utils.decorators import method_decorator
from django.contrib import auth

@method_decorator(csrf_protect,name='dispatch')
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = request.user 
        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': 'success'})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong'})

@method_decorator(csrf_protect,name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self,request,format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        re_password = data['re_password']

        if password == re_password :
            if User.objects.filter(username=username).exists():
                return Response({'error':'Username already exists'})
            else :
                if len(password) < 8:
                    return Response({'error':'password must be at least 8 characters'})
                else:
                    user = User.objects.create_user(username=username,password=password)
                    user= User.objects.get(id=user.id)
                    user_profile = UserProfile.objects.create(user=user ,first_name='',last_name='',phone='',city='')
                    return Response({'success':'User created successfully'})

        else :
            return Response({'error': 'Passwords do not match'})
        
@method_decorator(csrf_protect,name='dispatch')     
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self,request,format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        user = auth.authenticate(username=username,password=password)
        if user is not None:
            auth.login(request,user)
            return Response({'success':'User authenticated'})
        else:
            return Response({'error':'Error Authenticating'})
        
class LogoutView(APIView):
    def post(self,request,format=None):
        try:
            auth.logout(request)
            return Response({'success':'Logout Out'})
        except:
            return Response({'error':'Something went wrong when logging out'})

@method_decorator(ensure_csrf_cookie,name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self,request,format=None):
        return Response({'success':'CSRF cookie set'})

class DeleteAccountView(APIView):
    def delete(self, request,format=None):
        user = self.request.user
        try:
            user = User.objects.filter(id=user.id).delete()
            return Response({'success':'User deleted successfully'})
        except:
            return Response({'error':'Something wrong while try to delete'})
        

