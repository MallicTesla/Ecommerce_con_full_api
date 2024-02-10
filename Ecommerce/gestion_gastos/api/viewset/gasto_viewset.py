#   se usa para hacer busquedas en la base de datos
from django.db.models import Q

from rest_framework import status, viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication

from base.herramientas import formanto_fecha
from gestion_gastos.models import Provedor, Comprobante, MedioDePago
from gestion_gastos.api.serializers.gasto_serialozers import *
from gestion_gastos.api.serializers.general_serializer import *

from productos.models import Producto


class GastoViewSets (viewsets.GenericViewSet):
    serializer_class = GastoSerializers

    # para buscar y actualisar un provedor (factura)
    @action (methods=["get"], detail=False)
    def buscar_provedor(self, request:Request):
        #   esto toma las palabras para buscar al final va el nombre de la variable que viene del fron
        ruc_o_negosio = request.query_params.get ("ruc_o_negosio", "")
        #   busaca en los campos de la base de datos si existen coinsidensias
        provedor = Provedor.objects.filter(Q(ruc__iexact = ruc_o_negosio) | Q(negosio__iexact = ruc_o_negosio)).first()

        if provedor:
            provedor_serializer = ProvedorSerializer (provedor)
            return Response (provedor_serializer.data, status = status.HTTP_200_OK)
        return Response ({"Mensage":"No se a encontrado ningun provedor"}, status = status.HTTP_400_BAD_REQUEST)

    # crear provedor
    @action(methods = ["post"], detail = False)
    def nuevo_provedor (self, request:Request):
        data_provedor = request.data
        data_provedor = ProvedorRegistroSerializers(data = data_provedor)

        if data_provedor.is_valid():
            data_provedor = data_provedor.save()

            return Response ({  "Mensage":  "Provedor registrado corectamente",
                                "Provedor": data_provedor},
                                status = status.HTTP_201_CREATED)
        return Response ({"Error":data_provedor.error}, status = status.HTTP_400_BAD_REQUEST)

    @action (methods = ["get"], detail = False)
    def optener_comprovante (self, request:Request):
        data = Comprobante.objects.filter(estado = True).order_by("id")
        data = ComprobanteSerializer(data, many = True).data
        return Response (data)

    @action (methods = ["get"], detail = False)
    def optener_medio_pago (self, request:Request):
        data = MedioDePago.objects.filter(estado = True).order_by("id")
        data = MedioDePagoSerializer(data, many = True).data
        return Response (data)

    @action (methods = ["get"], detail = False)
    def optener_producto (self, request:Request):
        data = Producto.objects.filter(estado = True).order_by("id")
        data = ProductoSerializer(data, many = True).data
        return Response (data)

    def forma_fecha (self, data):
        JWT_authentication = JWTAuthentication()
        #   decodifica el token y da el usuario y el token
        usuario, token = JWT_authentication.authenticate(self.request)
        data ["usuario"] = usuario.id # creo que puede ser (user.id)
        data ["data"] = formanto_fecha (data ["data"])
        return data

    def create (self, request:Request):
        data = self.forma_fecha (request.data)
        serealzador = self.serializer_class(data = data)

        if serealzador.is_valid():
            serealzador.save()

            return Response ({"MENSAGE":"fACTURA CREADA CORECTAMENTE"}, status = status.HTTP_201_CREATED)
        return Response ({  "Mensage":"Han ocurido errores en la creacion",
                            "Error":serealzador.errors},
                            status = status.HTTP_400_BAD_REQUEST)