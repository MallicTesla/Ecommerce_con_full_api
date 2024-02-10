from django.contrib import admin

from gestion_gastos.models import *

admin.site.register(Provedor)
admin.site.register(MedioDePago)
admin.site.register(Comprobante)
admin.site.register(CategoriaGasto)
admin.site.register(Gasto)
