from queue import Queue
from threading import Thread
from mqtt.client import MQTTClient

class MQTTSubscribeThread(Thread):
    def __init__(self, queue: Queue):
        super().__init__()
        self.__queue = queue
        self.__topics = {}
    
    def subscribe(self, topic, callback):
        self.__topics[topic] = callback
        
    def __on_message(self, client, userdata, msg):
        if msg.topic in self.__topics:
            self.__topics[msg.topic](msg.payload)
    
    def run(self):
        client = MQTTClient.get_instance()
        client.on_message = self.__on_message
        client.connect('127.0.0.1')
        
        for topic in self.__topics:
            client.subscribe(topic)
        
        while True:
            client.loop()
