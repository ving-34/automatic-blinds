from mqtt.client import MQTTClient

class DeviceService:
    @staticmethod
    def find_devices():
        client = MQTTClient.get_instance()
        client.connect('127.0.0.1')
        client.publish('/device-discovery-start')
