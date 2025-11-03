""" Urls de accounts. """

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegistroView,
    LoginView,
    LogoutView,
    PerfilUsuarioView,
    CambiarPasswordView,
    ActualizarPerfilView
)

app_name = 'accounts'

urlpatterns = [
    # Autenticación
    path('registro/', RegistroView.as_view(), name='registro'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Perfil de usuario
    path('perfil/', PerfilUsuarioView.as_view(), name='perfil'),
    path('cambiar-password/', CambiarPasswordView.as_view(),
         name='cambiar_password'),
    path('actualizar-perfil/', ActualizarPerfilView.as_view(),
         name='actualizar_perfil'),
]
