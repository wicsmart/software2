from django.contrib.auth.models import User, Group
from rest_framework import serializers
from polls.models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class MensagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mensagem
        fields = ('id', 'nome', 'email', 'mensagem', 'created', 'telefone')

class SenseInSerializer(serializers.ModelSerializer):
    class Meta:
        model = SenseIn
        fields = ('id', 'temperatura', 'umidade', 'luz', 'time')