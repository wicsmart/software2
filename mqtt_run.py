import os
import django
import json

from paho.mqtt import publish
from paho.mqtt.publish import single

os.environ["DJANGO_SETTINGS_MODULE"] = 'version2.settings'
django.setup()

from polls.serializers import AcaoSerializer, StatusSerializer

from polls.models import Acao, Status
import paho.mqtt.client as mqtt
from paho.mqtt.client import MQTTv311

client = mqtt.Client(client_id='ServerDjango', clean_session=True, userdata=None,
                     protocol=MQTTv311, transport="tcp")

def save_acao(client, userdata, msg):
    my_json = msg.payload.decode()
    payload = json.loads(my_json)
    print(payload)
    a = AcaoSerializer(data=payload)
    if a.is_valid():
        a.save()
        print('salvou acao no heroku')
    else:
        print(a.errors)

def save_status(client, userdata, msg):
    my_json = msg.payload.decode()
    payload = json.loads(my_json)
    print(payload)
    s = StatusSerializer(data=payload)
    if s.is_valid():
        s.save()
        print('salvou status no heroku')
    else:
        print(s.errors)

def on_connect(client, userdata, rc, result):
    print('Conectado ao Broker')
#   client.publish(topic='acao', qos=2, payload='ligar', retain=False)
    client.subscribe(topic='acao', qos=2)
    client.message_callback_add(sub='acao', callback=save_acao)
    client.subscribe(topic='status', qos=2)
    client.message_callback_add(sub='status', callback=save_status)



def on_disconnect(client, userdata, rc, result):
    print('disconnected...rc=' + str(rc))

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender=Status)
def save_profile(sender, instance, **kwargs):
    print('post_save executado no heroku')
    publish.single(topic='status/refresh', qos=0, payload=instance.acao, hostname='165.227.28.137', port=1883)


client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.will_set(topic='warning', payload=str("ServerDjango ") + " disconnect", qos=2, retain=False)

client.connect(host='165.227.28.137', port=1883, keepalive=300, bind_address='')
client.loop_forever()