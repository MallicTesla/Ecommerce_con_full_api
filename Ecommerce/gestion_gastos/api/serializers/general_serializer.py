from rest_framework import serializers

from gestion_gastos.models import Provedor, Comprobante, MedioDePago

from productos.models import Producto

class ProvedorSerializer(serializers.ModelSerializer):
    class Meta :
        model = Provedor
        fields = ("id", "ruc", "negosio", "direcsion", )

class ComprobanteSerializer(serializers.ModelSerializer):
    class Meta :
        model = Comprobante
        fields = ("id", "nombre")

class MedioDePagoSerializer(serializers.ModelSerializer):
    class Meta :
        model = MedioDePago
        fields = ("id", "nombre")

class ProductoSerializer(serializers.ModelSerializer):
    class Meta :
        model = Producto
        fields = ("id", "nombre")

    
