from mqtt.client import MQTTClient
from motor.motor import Motor

class MotorService:
    def __init__(self, motor: Motor):
        self.__motor = motor;

    def move_motor(self, n_steps: int):
        MQTTClient.get_instance().publish('/motormove', n_steps)
