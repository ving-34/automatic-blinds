from entity.entity import Entity

class Device(Entity):
    def __init__(self):
        super().__init__()
        self.name = ''
        
    def set_name(self, name: str):
        self.name = name

    def to_json(self):
        return {
            **super().to_json(),
            'name': self.name
        }
