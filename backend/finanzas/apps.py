"""Configuración de la app finanzas."""

from django.apps import AppConfig


class FinanzasConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'finanzas'
    verbose_name = 'Gestión Financiera'
