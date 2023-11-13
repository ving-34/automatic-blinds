import paho.mqtt.client

def on_connect(client, userdata, flags, rc):
    print('CONNECTED')

class MQTTClient:
    __instance = None
    
    def __init__(self):
        self.__client = paho.mqtt.client.Client()
        self.__client.on_connect = on_connect
        
        self.__client.connect('127.0.0.1')

    @classmethod
    def get_instance(cls):
        if cls.__instance == None:
            cls.__instance = MQTTClient()
        
        cls.__instance.reconnect()

        return cls.__instance.__client
    
    def reconnect(self):
        if not self.__client.is_connected():
            self.__client.reconnect()

