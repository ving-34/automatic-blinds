from common.singleton import Singleton
from entity.entity import Entity
from entity.exceptions import EntityNotFoundException

class EntityStore(Singleton):
    def __init__(self):
        self.__entities = {}
        
    def select_by_id(self, id: str, json=False):
        entity = self.__entities.get(id)
        
        if json and entity == None:
            raise EntityNotFoundException
        
        return entity.to_json() if json else entity

    def select_all(self, json=False):
        return [entity.to_json() if json else entity for entity in list(self.__entities.values())]
        
    def set_one(self, id: str, entity: Entity):
        print(id, len(self.__entities))
        self.__entities[id] = entity
