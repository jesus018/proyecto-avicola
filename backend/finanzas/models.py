"""Modelos de la app finanzas."""

from django.db import models
from accounts.models import Usuario


class GastoConstruccion(models.Model):
    """Modelo para gastos de construcción del galpón."""
    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='gastos_construccion',
        verbose_name='Usuario'
    )
    descripcion = models.CharField(
        max_length=500,
        verbose_name='Descripción del Material/Servicio'
    )
    cantidad = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=1,
        verbose_name='Cantidad'
    )
    precio_unitario = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Precio Unitario'
    )
    total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        editable=False,
        verbose_name='Total'
    )
    fecha = models.DateField(
        auto_now_add=True,
        verbose_name='Fecha de Registro'
    )
    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creación'
    )
    fecha_actualizacion = models.DateTimeField(
        auto_now=True,
        verbose_name='Última Actualización'
    )

    class Meta:
        """ Clase meta gasto construccion. """
        verbose_name = 'Gasto de Construcción'
        verbose_name_plural = 'Gastos de Construcción'
        ordering = ['-fecha_creacion']

    def save(self, *args, **kwargs):
        """Calcular total antes de guardar."""
        self.total = self.cantidad * self.precio_unitario
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.descripcion} - ${self.total}"


class GastoCrianza(models.Model):
    """Modelo para gastos de crianza y mantenimiento."""

    TIPO_GASTO_CHOICES = [
        ('pollitos', 'Compra de Pollitos'),
        ('concentrado', 'Concentrado/Alimento'),
        ('vacunas', 'Vacunas'),
        ('medicamentos', 'Medicamentos'),
        ('vitaminas', 'Vitaminas/Suplementos'),
        ('agua', 'Agua'),
        ('electricidad', 'Electricidad'),
        ('limpieza', 'Productos de Limpieza'),
        ('mantenimiento', 'Mantenimiento Equipos'),
        ('otros', 'Otros'),
    ]

    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='gastos_crianza',
        verbose_name='Usuario'
    )
    tipo = models.CharField(
        max_length=20,
        choices=TIPO_GASTO_CHOICES,
        verbose_name='Tipo de Gasto'
    )
    descripcion = models.CharField(
        max_length=500,
        verbose_name='Cantidad/Descripción'
    )
    costo = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Costo Total'
    )
    fecha = models.DateField(
        auto_now_add=True,
        verbose_name='Fecha de Registro'
    )
    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creación'
    )
    fecha_actualizacion = models.DateTimeField(
        auto_now=True,
        verbose_name='Última Actualización'
    )

    class Meta:
        """ Clase meta gasto crianza. """
        verbose_name = 'Gasto de Crianza'
        verbose_name_plural = 'Gastos de Crianza'
        ordering = ['-fecha_creacion']

    def __str__(self):
        return f"{self.get_tipo_display()} - ${self.costo}"


class Venta(models.Model):
    """Modelo para registro de ventas de huevos."""
    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name='ventas',
        verbose_name='Usuario'
    )
    cliente = models.CharField(
        max_length=200,
        verbose_name='Cliente/Comprador'
    )
    cantidad = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Cantidad (docenas/cubetas)'
    )
    precio_unitario = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Precio por Unidad'
    )
    total = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        editable=False,
        verbose_name='Total'
    )
    fecha = models.DateField(
        auto_now_add=True,
        verbose_name='Fecha de Venta'
    )
    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de Creación'
    )
    fecha_actualizacion = models.DateTimeField(
        auto_now=True,
        verbose_name='Última Actualización'
    )

    class Meta:
        """ Clase meta venta. """
        verbose_name = 'Venta'
        verbose_name_plural = 'Ventas'
        ordering = ['-fecha_creacion']

    def save(self, *args, **kwargs):
        """Calcular total antes de guardar."""
        self.total = self.cantidad * self.precio_unitario
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.cliente} - ${self.total}"
