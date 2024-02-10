from rest_framework import serializers

from gestion_gastos.models import Provedor, Gasto

class GastoSerializers (serializers.ModelSerializer):
    class Meta:
        model = Gasto
        exclude = ("id",)

class ProvedorRegistroSerializers (serializers.ModelSerializer):
    class Meta:
        model = Provedor
        exclude = ("id",)

    def save (self):
        nuevo_provedor = Provedor.objects.create(**self.validated_data)
        # con el metodo muestra() retorna la instansia creada con los camps mensionados en el metodo del modelo
        return nuevo_provedor.muestra()