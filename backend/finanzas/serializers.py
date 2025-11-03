"""Serializadores de finanzas."""

from rest_framework import serializers
from .models import GastoConstruccion, GastoCrianza, Venta


class GastoConstruccionSerializer(serializers.ModelSerializer):
    """Serializer para gastos de construcción."""

    class Meta:
        """ Clase meta serializadora gasto construcción. """
        model = GastoConstruccion
        fields = [
            'id', 'descripcion', 'cantidad', 'precio_unitario',
            'total', 'fecha', 'fecha_creacion', 'fecha_actualizacion'
        ]
        read_only_fields = ['id', 'total', 'fecha',
                            'fecha_creacion', 'fecha_actualizacion']

    def validate_cantidad(self, value):
        """Validar que la cantidad sea positiva."""
        if value <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor a 0")
        return value

    def validate_precio_unitario(self, value):
        """Validar que el precio sea positivo."""
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser mayor a 0")
        return value


class GastoCrianzaSerializer(serializers.ModelSerializer):
    """Serializer para gastos de crianza."""
    tipo_display = serializers.CharField(
        source='get_tipo_display', read_only=True)

    class Meta:
        """ Clase meta serializadora gasto crianza. """
        model = GastoCrianza
        fields = [
            'id', 'tipo', 'tipo_display', 'descripcion', 'costo',
            'fecha', 'fecha_creacion', 'fecha_actualizacion'
        ]
        read_only_fields = ['id', 'fecha',
                            'fecha_creacion', 'fecha_actualizacion']

    def validate_costo(self, value):
        """Validar que el costo sea positivo."""
        if value <= 0:
            raise serializers.ValidationError("El costo debe ser mayor a 0")
        return value


class VentaSerializer(serializers.ModelSerializer):
    """Serializer para ventas."""

    class Meta:
        """ Clase meta serializadora venta. """
        model = Venta
        fields = [
            'id', 'cliente', 'cantidad', 'precio_unitario',
            'total', 'fecha', 'fecha_creacion', 'fecha_actualizacion'
        ]
        read_only_fields = ['id', 'total', 'fecha',
                            'fecha_creacion', 'fecha_actualizacion']

    def validate_cantidad(self, value):
        """Validar que la cantidad sea positiva."""
        if value <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor a 0")
        return value

    def validate_precio_unitario(self, value):
        """Validar que el precio sea positivo."""
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser mayor a 0")
        return value


class ResumenFinancieroSerializer(serializers.Serializer):
    """Serializer para el resumen financiero."""
    total_ingresos = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_construccion = serializers.DecimalField(
        max_digits=12, decimal_places=2)
    total_crianza = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_gastos = serializers.DecimalField(max_digits=12, decimal_places=2)
    ganancia = serializers.DecimalField(max_digits=12, decimal_places=2)
    roi = serializers.DecimalField(max_digits=5, decimal_places=2)
    porcentaje_construccion = serializers.DecimalField(
        max_digits=5, decimal_places=2)
    porcentaje_crianza = serializers.DecimalField(
        max_digits=5, decimal_places=2)
    analisis = serializers.CharField()
    estado_financiero = serializers.CharField()
