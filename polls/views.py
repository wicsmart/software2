from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from polls.serializers import *
from polls.models import *
from rest_framework import generics
from django.views import View
from django.http import JsonResponse


class IsAuthenticatedNotPost(IsAuthenticated):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return super(IsAuthenticatedNotPost, self).has_permission(request, view)


def home(request):
    return render(request, 'index.html', {'html_var':'holaaa'})

def about(request):
    return render(request, 'about.html')

@login_required(login_url = '/login/')
def cliente(request):
    return render(request, 'cliente.html')

def contatos(request):
    return render(request, 'contatos.html')

def dashboardCliente(request):
    return render(request, 'dashboard.html')

def produto(request):
    return render(request, 'produto.html')

def lastSenseIn(request):
    sensein = SenseIn.objects.latest('time')
    serializer = SenseInSerializer(sensein)
    return JsonResponse(serializer.data)

def lastSenseOut(request):
    senseout = SenseOut.objects.latest('time')
    serializer = SenseInSerializer(senseout)
    return JsonResponse(serializer.data)

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

    #permission_classes = (IsAuthenticatedNotPost,)
    permission_classes = (AllowAny,)

    queryset = SenseIn.objects.all()
    serializer_class = SenseInSerializer

class SenseInDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = SenseIn.objects.all()
    serializer_class = SenseInSerializer




class SenseOutList(generics.ListCreateAPIView):

   # permission_classes = (IsAuthenticatedNotPost,)
    permission_classes = (AllowAny,)
    queryset = SenseOut.objects.all()
    serializer_class = SenseOutSerializer

class SenseOutDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SenseOut.objects.all()
    serializer_class = SenseOutSerializer





class MensagemList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated)
    queryset = Mensagem.objects.all()
    serializer_class = MensagemSerializer


class MensagemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mensagem.objects.all()
    serializer_class = MensagemSerializer

class ClienteView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "cliente.html", context='Oi')
