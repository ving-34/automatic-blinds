from flask import Flask

from motor.motor_controller import MotorController
from device.device_controller import DeviceController

class Router:
    def __init__(self, app: Flask):
        controllers = [
            DeviceController,
            MotorController
        ]
        
        for controller in controllers:
            controller.add_routes(app)
