#  esta app se va a utilisar en varias apps
from django.db import models

from simple_history.models import HistoricalRecords

class BaseModel(models.Model):
    id = models.AutoField(primary_key = True)
    estado = models.BooleanField ("Estado", default = True)
    frcha_creacion = models.DateField ("Fecha de creacion", auto_now = False, auto_now_add = True)
    fecha_modificado = models.DateField ("Fecha de modificacion", auto_now = True, auto_now_add = False)
    fecha_borrado = models.DateField ("Fecha de borrado", auto_now = True, auto_now_add = False)
    historical = HistoricalRecords(user_model="usuarios.Usuario", inherit=True)

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value

    class Meta :
        abstract = True
        verbose_name = "Modelo Base"
        verbose_name_plural = "Modelos Base"

    def __str__(self):
        pass
