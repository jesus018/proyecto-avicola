"""Vistas de la app finanzas."""

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Q
from decimal import Decimal
import csv
from django.http import HttpResponse
from .models import GastoConstruccion, GastoCrianza, Venta
from .serializers import (
    GastoConstruccionSerializer,
    GastoCrianzaSerializer,
    VentaSerializer,
    ResumenFinancieroSerializer
)


class GastoConstruccionViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar gastos de construcción.
    """
    serializer_class = GastoConstruccionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Obtener solo los gastos del usuario autenticado."""
        return GastoConstruccion.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        """Asignar el usuario autenticado al crear un gasto."""
        serializer.save(usuario=self.request.user)


class GastoCrianzaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar gastos de crianza.
    """
    serializer_class = GastoCrianzaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Obtener solo los gastos del usuario autenticado."""
        return GastoCrianza.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        """Asignar el usuario autenticado al crear un gasto."""
        serializer.save(usuario=self.request.user)

    @action(detail=False, methods=['get'])
    def por_tipo(self, request):
        """Obtener gastos agrupados por tipo."""
        gastos_por_tipo = self.get_queryset().values('tipo').annotate(
            total=Sum('costo')
        ).order_by('-total')

        return Response(gastos_por_tipo)


class VentaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar ventas.
    """
    serializer_class = VentaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Obtener solo las ventas del usuario autenticado."""
        return Venta.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        """Asignar el usuario autenticado al crear una venta."""
        serializer.save(usuario=self.request.user)


class ResumenFinancieroViewSet(viewsets.ViewSet):
    """
    ViewSet para obtener resumen financiero y exportar datos.
    """
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def resumen(self, request):
        """Obtener resumen financiero completo."""
        usuario = request.user

        # Calcular totales
        total_ingresos = Venta.objects.filter(
            usuario=usuario
        ).aggregate(Sum('total'))['total__sum'] or Decimal('0')

        total_construccion = GastoConstruccion.objects.filter(
            usuario=usuario
        ).aggregate(Sum('total'))['total__sum'] or Decimal('0')

        total_crianza = GastoCrianza.objects.filter(
            usuario=usuario
        ).aggregate(Sum('costo'))['costo__sum'] or Decimal('0')

        total_gastos = total_construccion + total_crianza
        ganancia = total_ingresos - total_gastos

        # Calcular ROI
        roi = Decimal('0')
        if total_gastos > 0:
            roi = (ganancia / total_gastos) * Decimal('100')

        # Calcular porcentajes
        porcentaje_construccion = Decimal('0')
        porcentaje_crianza = Decimal('0')
        if total_gastos > 0:
            porcentaje_construccion = (
                total_construccion / total_gastos) * Decimal('100')
            porcentaje_crianza = (
                total_crianza / total_gastos) * Decimal('100')

        # Generar análisis
        analisis = self._generar_analisis(
            total_gastos, total_construccion, total_crianza,
            ganancia, porcentaje_construccion, porcentaje_crianza
        )

        # Estado financiero
        if ganancia > 0:
            estado_financiero = 'ganancia'
        elif ganancia < 0:
            estado_financiero = 'perdida'
        else:
            estado_financiero = 'equilibrio'

        data = {
            'total_ingresos': total_ingresos,
            'total_construccion': total_construccion,
            'total_crianza': total_crianza,
            'total_gastos': total_gastos,
            'ganancia': ganancia,
            'roi': roi,
            'porcentaje_construccion': porcentaje_construccion,
            'porcentaje_crianza': porcentaje_crianza,
            'analisis': analisis,
            'estado_financiero': estado_financiero
        }

        serializer = ResumenFinancieroSerializer(data)
        return Response(serializer.data)

    def _generar_analisis(self, total_gastos, total_construccion, total_crianza,
                          ganancia, porcentaje_construccion, porcentaje_crianza):
        """Generar análisis textual del negocio."""
        if total_gastos == 0:
            return "Aún no hay datos suficientes para realizar un análisis completo."

        analisis = f"Has invertido un total de ${total_gastos:.2f} en tu empresa. "
        analisis += f"Los gastos de construcción representan el {porcentaje_construccion:.1f}% del total. "
        analisis += f"Los gastos de crianza representan el {porcentaje_crianza:.1f}% del total. "

        if ganancia > 0:
            analisis += "¡Felicidades! Tu negocio está generando ganancias."
        elif ganancia < 0:
            analisis += "Actualmente tienes pérdidas. Analiza tus costos y precios de venta."
        else:
            analisis += "Estás en punto de equilibrio."

        return analisis

    @action(detail=False, methods=['get'])
    def exportar_csv(self, request):
        """Exportar todos los datos a CSV."""
        usuario = request.user

        # Crear respuesta HTTP con CSV
        response = HttpResponse(content_type='text/csv; charset=utf-8')
        response['Content-Disposition'] = 'attachment; filename="control_financiero_gallinas.csv"'
        response.write('\ufeff')  # BOM para UTF-8

        writer = csv.writer(response)

        # Título
        writer.writerow(['RESUMEN FINANCIERO - EMPRESA GALLINAS PONEDORAS'])
        writer.writerow([])

        # Resumen ejecutivo
        resumen_response = self.resumen(request)
        resumen = resumen_response.data

        writer.writerow(['RESUMEN EJECUTIVO'])
        writer.writerow(['Concepto', 'Monto'])
        writer.writerow(['Total Ingresos', f"${resumen['total_ingresos']}"])
        writer.writerow(
            ['Gastos Construcción', f"${resumen['total_construccion']}"])
        writer.writerow(['Gastos Crianza', f"${resumen['total_crianza']}"])
        writer.writerow(['Total Gastos', f"${resumen['total_gastos']}"])
        writer.writerow(['Ganancia/Pérdida', f"${resumen['ganancia']}"])
        writer.writerow(['ROI (%)', f"{resumen['roi']}%"])
        writer.writerow([])

        # Gastos de construcción
        writer.writerow(['GASTOS DE CONSTRUCCIÓN'])
        writer.writerow(['Fecha', 'Descripción', 'Cantidad',
                        'Precio Unitario', 'Total'])
        gastos_construccion = GastoConstruccion.objects.filter(usuario=usuario)
        for gasto in gastos_construccion:
            writer.writerow([
                gasto.fecha,
                gasto.descripcion,
                gasto.cantidad,
                f"${gasto.precio_unitario}",
                f"${gasto.total}"
            ])
        writer.writerow([])

        # Gastos de crianza
        writer.writerow(['GASTOS DE CRIANZA'])
        writer.writerow(['Fecha', 'Tipo', 'Descripción', 'Costo'])
        gastos_crianza = GastoCrianza.objects.filter(usuario=usuario)
        for gasto in gastos_crianza:
            writer.writerow([
                gasto.fecha,
                gasto.get_tipo_display(),
                gasto.descripcion,
                f"${gasto.costo}"
            ])
        writer.writerow([])

        # Ventas
        writer.writerow(['REGISTRO DE VENTAS'])
        writer.writerow(['Fecha', 'Cliente', 'Cantidad',
                        'Precio Unitario', 'Total'])
        ventas = Venta.objects.filter(usuario=usuario)
        for venta in ventas:
            writer.writerow([
                venta.fecha,
                venta.cliente,
                venta.cantidad,
                f"${venta.precio_unitario}",
                f"${venta.total}"
            ])

        return response
