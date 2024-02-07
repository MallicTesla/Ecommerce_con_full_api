from django.contrib import admin
from .models import *

class UnidadMedidaAdmin (admin.ModelAdmin):
    # esto es para que muestre estos cmpos en el administrador de django
    list_display = ("id","descripción")

class CategoriaProductoAdmin (admin.ModelAdmin):
    list_display = ("id","descripción")

admin.site.register(UnidadMedida, UnidadMedidaAdmin)
admin.site.register(CategoriaProducto, CategoriaProductoAdmin)
admin.site.register(Indicador)
admin.site.register(Producto)
