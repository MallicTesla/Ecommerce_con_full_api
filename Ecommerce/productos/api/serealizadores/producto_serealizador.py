from rest_framework import serializers
from productos.models import Producto
from productos.api.serealizadores.general_serealaizer import UnidadMedidaSerealizera, CategoriaProductoSerealizera, IndicadorSerealizera

class ProductoSerealizera (serializers.ModelSerializer):
    # esta es una forma de mostrar el titulo de la relasion que tiene muestra todo lo espesificaddo en el serealizador
    #   para que los campos muestren el nombre de la relasion
    #   primero va el campo de la relason y luego va el serealisador del modelo relasionado
    # unidad_medida = UnidadMedidaSerealizera()
    # categoria_producto = CategoriaProductoSerealizera()

    # asi muestra el str del modelo relasionado
    #   para que los campos muestren el nombre de la relasion
    #   primero va el campo de la relason 
    # unidad_medida = serializers.StringRelatedField()
    # categoria_producto = serializers.StringRelatedField()

    class Meta :
        model = Producto
        exclude = ("estado",)

    #   valida si pusistes una unidad de medida-esto lo valida pero no lo hace obligatorio
    def validate_unidad_medida (self, value):
        if value == "" or value == None:
            raise serializers.ValidationError("Deves ingresar una Unidad de Mendida")
        return value

    #   valida si pusistes una categoria al producto-esto lo valida pero no lo hace obligatorio
    def validate_categoria_producto (self, value):
        if value == "" or value == None:
            raise serializers.ValidationError("Deves ingresar una Categoria de Producto")
        return value

    #   aca hago que los campos unidad_medida y categoria_producto sean obligatorios
    def validate(self, data):
        if "unidad_medida" not in data.keys():
            raise serializers.ValidationError({"unidad_medida":"deve de ingresar una Unidad de Mendida"})

        if "categoria_producto" not in data.keys():
            raise serializers.ValidationError({"categoria_producto":"deve de ingresar una Categoria de Producto"})

        return data

    #  asi mostrar el contenido de todos los campos incluyendo las relasinados
    def to_representation(self, instance):
        return {
            "id": instance.id,
            # el if es para cuando no tenes ninguna cantidad en estock aparesca 0 en el fron
            # "stock": instance.stocks.get ("cantidad__sum") if instance.stocks.get ("cantidad__sum") is not None else 0,
            "producto": instance.producto,
            "descripcion_producto": instance.descripcion_producto,
            #   cuando no tenes una imagen devuelve una cadena vasio y da error asi lo areglas
            # "imagen_producto": instance.imagen_producto if instance.imagen_producto != "" else "",
            # "imagen_producto": instance.imagen_producto.url if instance.imagen_producto != "" else "",
            "unidad_medida": instance.unidad_medida.descripción if instance.unidad_medida is not None else "",
            "categoria_producto": instance.categoria_producto.descripción if instance.categoria_producto is not None else "",
        }