from datetime import datetime

# def validar_archivo (request, campo, actualizar=False):
#     #   por defecto el (request.data) no se puede modificar pero esta es una forma de modificarla no muy elegante
#     request._mutable = True

#     if actualizar:
#         # si al actualisar devuelve un un str lo elimina de la actualizasion y lo deja como estaba
#         if type (request[campo]) == str:
#             del request[campo]

#     else:
#         #   aca se le asigna Nona el primer data si el tipo de dato que le llega es un str y sino lo deja como esta
#         request[campo] = None if type (request[campo]) == str else request [campo]
#     #   despues se tiene que volber a bloquearla
#     request._mutable = False

#     return request


# lo mismo pero usando metodos internos
def validar_archivo (request, campo, actualizar=False):
    # crea una copia der request que si es mutable (aunque ami me funsiono igual sin esto pero de la otra forma no me dejaba)
    request = request.copy()

    if actualizar:
        # si al actualisar devuelve un un str lo elimina de la actualizasion y lo deja como estaba
        if type (request[campo]) == str:
            #   puede ser asi
            # del request[campo]
            #   o asi tambien
            request.__delitem__(campo)

    else:
        # si el campo es un str lo setea como None
        if type (request[campo]) == str:
            request.__setitem__(campo, None)

    return request

#   para cambiar el formato de la fecha que biene desde el fron
def formanto_fecha (data):
    data = datetime.strptime (data, "%d/%m/%Y")
    data = f"{data.año}-{data.mes}-{data.dia}"
    return data



