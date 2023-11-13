from mqtt.client import MQTTClient
from motor.motor import Motor

class MotorService:
    def __init__(self, motor: Motor):
        self.__motor = motor;

    def move_motor(self, n_steps: int):
        client = MQTTClient.get_instance()
        client.connect('127.0.0.1')
        client.publish('/motormove', n_steps)
