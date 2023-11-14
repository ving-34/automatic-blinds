from abc import ABC, abstractmethod
from entity.entity import Entity
from entity.exceptions import InvalidEntityException

class EntityBuilder(ABC):
    def __init__(self):
        self._entity: Entity = None
    
    def set_id(self, id: str):
        self._entity.set_id(id)
    
    def is_valid(self):
        return self._entity.id != None
    
    def get_result(self):
        if not self.is_valid():
            raise InvalidEntityException
        
        return self._entity
