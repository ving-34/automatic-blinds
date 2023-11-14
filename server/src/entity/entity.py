from abc import ABC, abstractmethod

class Entity(ABC):
    def __init__(self):
        self.id = None
        
    def set_id(self, id: str):
        self.id = id
        
    @abstractmethod
    def to_json(self):
        return {
            'id': self.id,
        }
