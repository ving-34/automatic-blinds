from queue import Queue
from mqtt.publish_thread import MQTTPublishThread
from mqtt.client import MQTTClient

class MQTTService:
    __instance = None
    
    def __init__(self):
        self.__queue = Queue()
        # self.publish_thread = MQTTPublishThread(self.__queue)
        self.__is_started = False

    @classmethod
    def get_instance(cls):
        if not cls.__instance:
            cls.__instance = MQTTService()
            
        return cls.__instance
    
    def start(self):
        if self.__is_started:
            return
        
        # self.publish_thread.start()
        self.__is_started = True
