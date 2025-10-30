"""Admin de la app finanzas."""

from django.contrib import admin
from .models import GastoConstruccion, GastoCrianza, Venta


@admin.register(GastoConstruccion)
class GastoConstruccionAdmin(admin.ModelAdmin):
    """Administrador para gastos de construcción."""
    list_display = (
        'id', 'usuario', 'descripcion', 'cantidad',
        'precio_unitario', 'total', 'fecha'
    )
    list_filter = ('fecha', 'usuario')
    search_fields = ('descripcion', 'usuario__email', 'usuario__username')
    readonly_fields = ('total', 'fecha', 'fecha_creacion',
                       'fecha_actualizacion')
    ordering = ('-fecha_creacion',)

    fieldsets = (
        ('Información del Gasto', {
            'fields': ('usuario', 'descripcion', 'cantidad', 'precio_unitario', 'total')
        }),
        ('Fechas', {
            'fields': ('fecha', 'fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )


@admin.register(GastoCrianza)
class GastoCrianzaAdmin(admin.ModelAdmin):
    """Administrador para gastos de crianza."""
    list_display = (
        'id', 'usuario', 'tipo', 'descripcion',
        'costo', 'fecha'
    )
    list_filter = ('tipo', 'fecha', 'usuario')
    search_fields = ('descripcion', 'usuario__email', 'usuario__username')
    readonly_fields = ('fecha', 'fecha_creacion', 'fecha_actualizacion')
    ordering = ('-fecha_creacion',)

    fieldsets = (
        ('Información del Gasto', {
            'fields': ('usuario', 'tipo', 'descripcion', 'costo')
        }),
        ('Fechas', {
            'fields': ('fecha', 'fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Venta)
class VentaAdmin(admin.ModelAdmin):
    """Administrador para ventas."""
    list_display = (
        'id', 'usuario', 'cliente', 'cantidad',
        'precio_unitario', 'total', 'fecha'
    )
    list_filter = ('fecha', 'usuario')
    search_fields = ('cliente', 'usuario__email', 'usuario__username')
    readonly_fields = ('total', 'fecha', 'fecha_creacion',
                       'fecha_actualizacion')
    ordering = ('-fecha_creacion',)

    fieldsets = (
        ('Información de la Venta', {
            'fields': ('usuario', 'cliente', 'cantidad', 'precio_unitario', 'total')
        }),
        ('Fechas', {
            'fields': ('fecha', 'fecha_creacion', 'fecha_actualizacion'),
            'classes': ('collapse',)
        }),
    )
