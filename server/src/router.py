from flask import Flask

from motor.motor_controller import MotorController

class Router:
    def __init__(self, app: Flask):
        controllers = [
            MotorController
        ]
        
        for controller in controllers:
            controller.add_routes(app)
