from queue import Queue
from threading import Thread
from mqtt.client import MQTTClient

class MQTTPublishThread(Thread):
    def __init__(self, queue: Queue):
        super().__init__()
        self.__queue = queue
    
    def run(self):
        client = MQTTClient.get_instance()
        
        while True:
            data = self.__queue.get()
            if data:
                client.publish(data['topic'])
            
            client.loop()
