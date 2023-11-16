from entity.entity_builder import EntityBuilder
from device.device import Device

class DeviceBuilder(EntityBuilder):
    def __init__(self):
        super().__init__()
        self._entity = Device()
    
    def set_name(self, name: str):
        self._entity.name = name
    
        return self

    def set_type(self, type: str):
        self._entity.type = type
    
        return self
