from django.db import models
from django.core.exceptions import ObjectDoesNotExist

#   modelo importado de otra app
from base.models import BaseModel
from productos.models import Producto

from simple_history.models import HistoricalRecords


class Provedor (BaseModel):
    ruc = models.CharField(unique=True, max_length=11)
    negosio = models.CharField('Razón Social', unique=True, max_length=150, null=False, blank=False)
    direcsion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=15, null=True, blank=True)
    email = models.EmailField(null=True)

    class Meta:
        ordering = ['id']
        verbose_name = 'Proveedor'
        verbose_name_plural = 'Proveedores'   

    def __str__(self):
        return self.negosio

    def muestra (self):
        return {
            'id': self.id,
            'ruc': self.ruc,
            'negosio': self.negosio,
            'direcsion': self.direcsion,
            'telefono': self.telefono,
            'email': self.email
        }

class MedioDePago (BaseModel):
    nombre = models.CharField('Nombre de Medio de Pago', max_length=100)

    class Meta:
        ordering = ['id']
        verbose_name = 'Medio de Pago'
        verbose_name_plural = 'Medio de Pagos'

    def __str__(self):
        return self.nombre


class Comprobante (BaseModel):
    nombre = models.CharField('Nombre de comprobante de Pago', max_length=100)

    class Meta:
        ordering = ['id']
        verbose_name = 'Comprobante'
        verbose_name_plural = 'Comprobantes'

    def __str__(self):
        return self.nombre


class CategoriaGasto (BaseModel):
    nombre = models.CharField('Nombre de Categoría de Gasto', max_length=100)

    class Meta:
        ordering = ['id']
        verbose_name = 'Categoria de Gasto'
        verbose_name_plural = 'Categorias de Gastos'

    def __str__(self):
        return self.nombre

class Gasto (BaseModel):
    fecha_factura = models.DateField('Fecha de emisión de factura', auto_now=False, auto_now_add=False)    
    cantidad = models.DecimalField('Cantidad', max_digits=10, decimal_places=2)
    precio_unitario = models.DecimalField('Precio Unitario', max_digits=10, decimal_places=2, default=0)
    numero_comprobante = models.CharField('Número de comprobante', max_length=50)
    total = models.DecimalField('Total', max_digits=10, decimal_places=2, default=0)
    comprobante = models.ForeignKey(Comprobante, on_delete=models.CASCADE)
    usuario = models.ForeignKey("usuarios.Usuario", on_delete=models.CASCADE)
    provedor = models.ForeignKey(Provedor, on_delete=models.CASCADE)
    medio_de_pago = models.ForeignKey(MedioDePago, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)

    class Meta:
        ordering = ['id']
        verbose_name = 'Gasto'
        verbose_name_plural = 'Gastos'

    def __str__(self):
        return self.numero_comprobante

class Merma (BaseModel):
    fecha_merma = models.DateField('Fecha de emisión de Merma', auto_now=False, auto_now_add=False)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.DecimalField('Cantidad', max_digits=7, decimal_places=2)
    perdida = models.DecimalField('Dinero perdido', max_digits=7, decimal_places=2)

    class Meta:
        ordering = ['id']
        verbose_name = 'Merma'
        verbose_name_plural = 'Mermas'


    def __str__(self):
        return "Merma de {0}".format(self.product.__str__())