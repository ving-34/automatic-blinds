from entity.entity_builder import EntityBuilder
from device.device import Device

class DeviceBuilder(EntityBuilder):
    def __init__(self):
        super().__init__()
        self._entity = Device()
    
    def set_name(self, name: str):
        self._entity.set_name(name)
    
        return self
