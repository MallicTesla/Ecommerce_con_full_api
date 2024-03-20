#   modelo importado de otra app
from base.models import BaseModel

from django.utils import timezone
from django.db import models
from simple_history.models import HistoricalRecords

class UnidadMedida (BaseModel):
    descripción = models.CharField ("Descripción", max_length = 50, blank = False, null = False, unique = True)
    # esto es para manegr los usuarios
    # historial = HistoricalRecords ()

    #  este decorador se utiliza para definir un método como una propiedad de solo lectura
    #  con esta funcion se optiene el usuario que realiso la modificasion
    # @property
    # def _history_user (self):
    #     return self.changed_by
    
    # #   con esta funcion se guarda el usuario que realiso la modificasion en el historial
    # @_history_user.setter
    # def _history_user (self, value):
    #     self.changed_by = value

    class Meta:
        verbose_name = 'Unidad de Medida'
        verbose_name_plural = 'Unidads de Medidas'

    def __str__(self):
        return self.descripción


class CategoriaProducto (BaseModel):
    descripción = models.CharField ("Descripción", max_length = 50, blank = False, null = False, unique = True)
    # historial = HistoricalRecords ()

    # @property
    # def _history_user (self):
    #     return self.changed_by
    
    # @_history_user.setter
    # def _history_user (self, value):
    #     self.changed_by = value

    class Meta:
        verbose_name = 'Categoria de Producto'
        verbose_name_plural = 'Categorias de Productos'

    def __str__(self):
        return self.descripción


class Indicador (BaseModel):
    valor_descuento = models.PositiveSmallIntegerField (default = 0)
    categoria_producto = models.ForeignKey (UnidadMedida, on_delete = models.CASCADE, verbose_name = "Indicador de Oferta")
    # historial = HistoricalRecords ()

    # @property
    # def _history_user (self):
    #     return self.changed_by
    
    # @_history_user.setter
    # def _history_user (self, value):
    #     self.changed_by = value

    class Meta:
        verbose_name = 'Indicaor de Oferta'
        verbose_name_plural = 'Indicador de Ofertas'

    def __str__(self):
        return f"Oferta en la categoria {self.categoria_producto} : {self.valor_descuento}%"


class Producto(BaseModel):
    producto = models.CharField("Producto", max_length=150, unique=True, blank=False, null=False)
    descripcion_producto = models.TextField("Descripción del producto", null=False, unique=True)
    precio = models.FloatField("Precio", max_length=10, unique=False, blank=False, null=False)
    vendido = models.BooleanField("Vendido", default=False, blank=False, null=False)
    # producto_agregado = models.DateTimeField("Fecha de agregado", default=timezone.now)
    # producto_modificado = models.DateTimeField("Fecha de modificado", default=timezone.now)
    # producto_comprado = models.DateTimeField("Fecha de comprado", null=True, blank=True)

    # vendedor = 
    # comprador = 
    
    # aca es donde se guardan la imagenes upload_to="productos_imagen/"
    imagen_producto = models.ImageField("Imagen del producto", upload_to="productos_imagen/", blank = True, null = True)

    unidad_medida = models.ForeignKey (UnidadMedida, on_delete = models.CASCADE, verbose_name = "Unidad de medida", null = True)
    categoria_producto = models.ForeignKey (CategoriaProducto,on_delete = models.CASCADE, verbose_name = "Categoria del producto", null = True)
    # historial = HistoricalRecords ()

    # @property
    # def _history_user (self):
    #     return self.changed_by
    
    # @_history_user.setter
    # def _history_user (self, value):
    #     self.changed_by = value

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return self.producto
    
    #   el estok se agrega de esta forma por las diversas operasiones que se le puede hacer
    #   property permite llamar a la funsion como si fuera un campo mas del modelo
    # @property
    # def stocks (self):
    #     from django.db.models import Sum
    # #       esto se importa aca porque puede generar recursividad

# descomenta esto despues de hacer la app para gestionar
        # from gestion_gastos.models import Gasto

        # gasto = Gasto.objects.filter (
        #     producto = self,
        #     estate = True
        #     #   esto hace referensia a el campo del modelo de Gasto
        # ).aaggregate(Sum("cantidad"))

        # return gasto


