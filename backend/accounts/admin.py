""" Admin de la api accounts. """

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Usuario, PerfilUsuario


@admin.register(Usuario)
class UsuarioAdmin(BaseUserAdmin):
    """
    Administrador personalizado para el modelo Usuario
    """
    list_display = ('email', 'username', 'first_name', 'last_name',
                    'nombre_granja', 'esta_activo', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'esta_activo', 'fecha_creacion')
    search_fields = ('email', 'username', 'first_name',
                     'last_name', 'nombre_granja')
    ordering = ('-fecha_creacion',)

    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Información Personal', {
         'fields': ('first_name', 'last_name', 'telefono')}),
        ('Información del Negocio', {
         'fields': ('nombre_granja', 'ubicacion')}),
        ('Permisos', {'fields': ('is_active', 'esta_activo',
         'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas Importantes', {'fields': (
            'last_login', 'date_joined', 'fecha_creacion', 'fecha_actualizacion')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )

    readonly_fields = ('fecha_creacion', 'fecha_actualizacion',
                       'last_login', 'date_joined')


@admin.register(PerfilUsuario)
class PerfilUsuarioAdmin(admin.ModelAdmin):
    """
    Administrador para el perfil de usuario
    """
    list_display = ('usuario', 'fecha_nacimiento',
                    'idioma', 'recibir_notificaciones')
    list_filter = ('idioma', 'recibir_notificaciones')
    search_fields = ('usuario__email', 'usuario__first_name',
                     'usuario__last_name', 'biografia')

    fieldsets = (
        ('Usuario', {'fields': ('usuario',)}),
        ('Información Personal', {
         'fields': ('avatar', 'biografia', 'fecha_nacimiento')}),
        ('Preferencias', {'fields': ('idioma', 'recibir_notificaciones')}),
    )
