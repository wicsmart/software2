from django.db import models
from paho.mqtt.publish import single


class Mensagem(models.Model):
    mensagem = models.TextField('Mensagem', blank=False)
    nome = models.CharField('Nome', max_length=100, blank=False)
    telefone = models.CharField('Telefone', max_length=15)
    email = models.CharField('Email', max_length=30, blank=False)
    created = models.DateTimeField('Criado', auto_now_add=True, blank=False, auto_now=False)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return "Nome: " + str(self.nome) + " " + str(self.email) + "Criado em " + str(self.created)


class SenseIn(models.Model):
    temperatura = models.FloatField('Temperatura', blank=False)
    umidade = models.FloatField('Umidade', blank=False)
    luz = models.IntegerField('Luz', blank=False)
    time = models.DateTimeField('Time', blank=False)

    def __str__(self):
        return "Temperatura: " + str(self.temperatura) + " Umidade: " + str(self.umidade) + " Time: " + str(self.time)

    class Meta:
        ordering = ['time']

class SenseOut(models.Model):

    temperatura = models.FloatField('Temperatura', blank=False)
    umidade = models.FloatField('Umidade', blank=False)
    luz = models.IntegerField('Luz', blank=False)
    time = models.DateTimeField('Time', blank=False)

    def __str__(self):
        return "Temperatura: " + str(self.temperatura) + " Umidade: " + str(self.umidade) + " Time: " + str(self.time)

    class Meta:
        ordering = ['time']

class Monitor(models.Model):
    upload = models.FileField(upload_to='media', null=True, blank=True)
    created = models.DateTimeField(blank=False)

    class Meta:
        ordering = ['created']



class Acao(models.Model):
    acao = models.TextField('Acao', blank=False)
    created = models.DateTimeField('Criado', auto_now_add=True, blank=False)

    class Meta:
        ordering = ['created']


class Status(models.Model):
    status = models.FileField('Status', blank=True)
    created = models.DateTimeField('Criado', auto_now_add=True, blank=False)

    class Meta:
        ordering = ['created']
