""" Modelo de accounts. """

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class Usuario(AbstractUser):
    """
    Modelo de usuario personalizado para la aplicación de gallinas ponedoras
    """
    email = models.EmailField(unique=True, verbose_name='Correo Electrónico')
    telefono = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message="El número de teléfono debe estar en el formato: '+999999999'. Hasta 15 dígitos."
            )
        ],
        verbose_name='Teléfono'
    )

    # Información del negocio
    nombre_granja = models.CharField(
        max_length=200, blank=True, null=True, verbose_name='Nombre de la Granja')
    ubicacion = models.CharField(
        max_length=300, blank=True, null=True, verbose_name='Ubicación')

    # Campos de auditoría
    fecha_creacion = models.DateTimeField(
        auto_now_add=True, verbose_name='Fecha de Registro')
    fecha_actualizacion = models.DateTimeField(
        auto_now=True, verbose_name='Última Actualización')
    esta_activo = models.BooleanField(default=True, verbose_name='Activo')

    # Configuración
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    class Meta:
        """ Clase meta del modelo usuario. """
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['-fecha_creacion']

    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.username


class PerfilUsuario(models.Model):
    """
    Perfil extendido del usuario con información adicional
    """
    usuario = models.OneToOneField(
        Usuario, on_delete=models.CASCADE, related_name='perfil')
    avatar = models.ImageField(
        upload_to='avatares/', blank=True, null=True, verbose_name='Avatar')
    biografia = models.TextField(
        blank=True, null=True, verbose_name='Biografía')
    fecha_nacimiento = models.DateField(
        blank=True, null=True, verbose_name='Fecha de Nacimiento')

    # Preferencias
    recibir_notificaciones = models.BooleanField(
        default=True, verbose_name='Recibir Notificaciones')
    idioma = models.CharField(max_length=5, default='es', choices=[
                              ('es', 'Español'), ('en', 'Inglés')])

    class Meta:
        """ Clase meta del modelo perfilUsuario. """
        verbose_name = 'Perfil de Usuario'
        verbose_name_plural = 'Perfiles de Usuario'

    def __str__(self):
        return f"Perfil de {self.usuario.get_full_name()}"
