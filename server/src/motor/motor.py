class Motor:
    def __init__(self, id: str):
        self.__id = id

    def to_json(self):
        return {
            'id': self.__id
        }
        