"""URLs de finanzas."""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GastoConstruccionViewSet,
    GastoCrianzaViewSet,
    VentaViewSet,
    ResumenFinancieroViewSet
)

app_name = 'finanzas'

router = DefaultRouter()
router.register(r'gastos-construccion', GastoConstruccionViewSet,
                basename='gastos-construccion')
router.register(r'gastos-crianza', GastoCrianzaViewSet,
                basename='gastos-crianza')
router.register(r'ventas', VentaViewSet, basename='ventas')
router.register(r'resumen', ResumenFinancieroViewSet, basename='resumen')

urlpatterns = [
    path('', include(router.urls)),
]
