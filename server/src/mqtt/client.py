import paho.mqtt.client

class MQTTClient:
    __instance = None
    
    def __init__(self):
        self.__client = paho.mqtt.client.Client()

    @classmethod
    def get_instance(cls):
        return paho.mqtt.client.Client()
        # if cls.__instance == None:
        #     cls.__instance = MQTTClient()
        
        # return cls.__instance.__client
    
    def reconnect(self):
        if not self.__client.is_connected():
            self.__client.reconnect()

