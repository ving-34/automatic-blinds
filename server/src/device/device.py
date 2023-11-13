class Device:
    def __init__(self, device_id: str):
        self.__id = device_id

    def to_json(self):
        return {
            'id': self.__id
        }
