from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from polls.serializers import *
from polls.models import *
from rest_framework import generics
from django.views import View


def home(request):
    return render(request, 'index.html', {'html_var':'holaaa'})

def about(request):
    return render(request, 'about.html')

@login_required(login_url = '/login/')
def cliente(request):
    return render(request, 'cliente.html')

def contatos(request):
    return render(request, 'contatos.html')

def produto(request):
    return render(request, 'produto.html')

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class SenseInList(generics.ListCreateAPIView):

    queryset = SenseIn.objects.all()
    serializer_class = SenseInSerializer

class SenseInDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = SenseIn.objects.all()
    serializer_class = SenseInSerializer


class MensagemList(generics.ListCreateAPIView):
    queryset = Mensagem.objects.all()
    serializer_class = MensagemSerializer


class MensagemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mensagem.objects.all()
    serializer_class = MensagemSerializer

class ClienteView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "cliente.html", context='Oi')
