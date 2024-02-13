from datetime import timedelta

from django.utils import timezone 
from django.conf import settings

from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed


#   es para añadirle tiempo de expirasion a los token
class ExpirasonTokenAuthentication (TokenAuthentication):
    # cuando se crea un nuevo toquen despues de que expira el fron no se entera y asi si
    #   nuevo
    # expirado = False

    def expira_en (self,token):
        # se define el tiempo que a pasodo
        tiempo_pasado = timezone.now() - token.created
        tiempo_restante = timedelta (seconds = settings.TIEMPO_EXPIRASION_TOKEN) - tiempo_pasado
        return tiempo_restante

    def token_expira_en (self,token):
        # compara la fecha de expirasion del token con la hora actual
        return self.expira_en (token) < timedelta (seconds = 0) 

    #   esto es lo que hase si expiro el token
    def si_expiro_token (self,token):
        si_expiro = self.token_expira_en (token)

        if si_expiro:
            #   nuevo
            # self.expirado = True
            #   se elimina el token caducado y y se crea uno nuevo
            usuario = token.user
            token.delete()
            token = self.get_model().objects.create(user = usuario)
            print ("Token expirado : si_expiro_token")
        #   nueva
        # return si_expiro, token
        return si_expiro, token

    def authenticate_credentials(self, key):
        #   nuevo
        # mensage, token, user = None, None, None
        user = None

        try:
            token = self.get_model().objects.select_related("user").get (key = key)
            user = token.user
            #   nuevo
            token = self.si_expiro_token (token)

        except self.get_model().DoesNotExist:
            pass
            #   nuevo
            # mensage = "Token invalido."
            # self.expirado = True

        # if token is not None :
        #     if not token.user.is_active:
        #         mensage = "Usuario no activo o eliminado."

        #     expiro = self.si_expiro_token (token)
        #     if expiro:
        #         mensage = "Su token expiro."

        # return (user, token, mensage, self.expirado)
        return user
