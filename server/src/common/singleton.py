class Singleton:
    __instance = None
    
    @classmethod
    def get_instance(cls):
        if not cls.__instance:
            cls.__instance = cls()
        
        return cls.__instance
