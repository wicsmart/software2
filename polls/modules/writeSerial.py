import datetime

from paho.mqtt import publish

host = '165.227.28.137'
port = 1883
keepalive= 300
topicAcao = 'acao'
topicStatus = 'staus'

def escrever_acao(msg):
    print('Aqui escrevo na serial : ' + msg)
    payload = '{"acao" : "' + msg + '"}'
    enviar_acao_to_heroku(payload)


def enviar_status_to_heroku(msg):
    publish.single(topic=topicStatus, qos=2, payload=msg, hostname=host, port=port)
    print('Status para o heroku')

def enviar_status_to_local(msg):
    publish.single(topic=topicStatus, qos=2, payload=msg, hostname='localhost', port=8000)
    print('Status para local')
    

def enviar_acao_to_heroku(msg):
    publish.single(topic=topicAcao, qos=2, payload=msg, hostname=host, port=port)
    print('Aqui envio para o heroku')