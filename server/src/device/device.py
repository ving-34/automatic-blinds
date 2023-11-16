from entity.entity import Entity

class Device(Entity):
    def __init__(self):
        super().__init__()
        self.name = ''
        self.type = ''

    def to_json(self):
        return {
            **super().to_json(),
            'name': self.name,
            'type': self.type,
        }
