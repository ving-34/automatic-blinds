from motor.motor import Motor

class MotorStore:
    __instance = None
    
    def __init__(self):
        self.__motors = {}
        
        self.set_motor('1', Motor('1'))
        
    @classmethod
    def get_instance(cls):
        if not cls.__instance:
            cls.__instance = MotorStore()
        
        return cls.__instance
        
    def get_motor(self, motor_id: str):
        return self.__motors.get(motor_id, None).to_json()

    def set_motor(self, id: str, motor: Motor):
        self.__motors[id] = motor
