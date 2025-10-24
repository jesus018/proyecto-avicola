from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import logout
from .models import Usuario, PerfilUsuario
from .serializers import (
    RegistroSerializer,
    LoginSerializer,
    UsuarioSerializer,
    CambiarPasswordSerializer,
    PerfilUsuarioSerializer
)


class RegistroView(generics.CreateAPIView):
    """
    Vista para registrar nuevos usuarios
    POST /api/auth/registro/
    """
    queryset = Usuario.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegistroSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)

        return Response({
            'user': UsuarioSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'Usuario registrado exitosamente'
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    Vista para login de usuarios
    POST /api/auth/login/
    """
    permission_classes = (permissions.AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']

        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)

        return Response({
            'user': UsuarioSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'Login exitoso'
        }, status=status.HTTP_200_OK)


class LogoutView(APIView):
    """
    Vista para logout de usuarios
    POST /api/auth/logout/
    """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()

            logout(request)
            return Response({
                'message': 'Logout exitoso'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Token inválido'
            }, status=status.HTTP_400_BAD_REQUEST)


class PerfilUsuarioView(generics.RetrieveUpdateAPIView):
    """
    Vista para obtener y actualizar el perfil del usuario autenticado
    GET/PUT/PATCH /api/auth/perfil/
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UsuarioSerializer

    def get_object(self):
        return self.request.user


class CambiarPasswordView(generics.UpdateAPIView):
    """
    Vista para cambiar la contraseña del usuario autenticado
    PUT/PATCH /api/auth/cambiar-password/
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CambiarPasswordSerializer

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            'message': 'Contraseña actualizada exitosamente'
        }, status=status.HTTP_200_OK)


class ActualizarPerfilView(generics.UpdateAPIView):
    """
    Vista para actualizar el perfil extendido del usuario
    PUT/PATCH /api/auth/actualizar-perfil/
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = PerfilUsuarioSerializer

    def get_object(self):
        perfil, created = PerfilUsuario.objects.get_or_create(
            usuario=self.request.user)
        return perfil
