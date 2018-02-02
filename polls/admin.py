from django.contrib import admin

# Register your models here.
from .models import SenseIn, SenseOut, Mensagem, Monitor


class MensagemAdmin (admin.ModelAdmin):

    list_display = ['nome', 'mensagem', 'created']
    search_fields = ['nome', 'created']

class SenseInAdmin (admin.ModelAdmin):

    list_display = ['temperatura', 'umidade', "luz", 'time']
    search_fields = ['temperatura', 'umidade', 'time']


class SenseOutAdmin(admin.ModelAdmin):

        list_display = ['temperatura', 'umidade', "luz", 'time']
        search_fields = ['temperatura', 'umidade', 'T=time']

admin.site.register(SenseIn, SenseInAdmin)

admin.site.register(SenseOut, SenseOutAdmin)

admin.site.register(Mensagem, MensagemAdmin)
