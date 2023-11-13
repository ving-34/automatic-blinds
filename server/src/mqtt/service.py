from queue import Queue
from mqtt.subscribe_thread import MQTTSubscribeThread
from mqtt.client import MQTTClient

class MQTTService:
    __instance = None
    
    def __init__(self):
        self.__queue = Queue()
        self.__is_started = False
        self.subscribe_thread = MQTTSubscribeThread(self.__queue)

    @classmethod
    def get_instance(cls):
        if not cls.__instance:
            cls.__instance = MQTTService()
            
        return cls.__instance
    
    def start(self):
        if self.__is_started:
            return
        
        self.subscribe_thread.start()
        self.__is_started = True
