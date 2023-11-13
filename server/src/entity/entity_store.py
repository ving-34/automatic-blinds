from common.singleton import Singleton
from entity.entity import Entity

class EntityStore(Singleton):
    def __init__(self):
        self.__entities = {}
        
    def get_one(self, id: str):
        return self.__entities.get(id, None).to_json()

    def set_one(self, id: str, entity: Entity):
        self.__entities[id] = entity
