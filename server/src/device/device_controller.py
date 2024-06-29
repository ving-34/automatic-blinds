from flask import Flask, request, jsonify

from uuid import uuid4

from common.abstract_controller import AbstractController
from device.device_store import DeviceStore
from device.device_builder import DeviceBuilder
from entity.exceptions import InvalidEntityException, EntityNotFoundException

class DeviceController(AbstractController):
    @classmethod
    def add_routes(cls, app: Flask):
        @app.route('/api/device', methods = ['POST'])
        def add_device():
            try:
                device_data = request.json
                builder = DeviceBuilder()
                builder.set_id(device_data.get('id', str(uuid4())))
                builder.set_name(device_data.get('name', '(Unnamed)'))
                builder.set_type(device_data.get('type', 'Unknown'))
                device = builder.get_result()
                DeviceStore.get_instance().set_one(
                    device.id,
                    device,
                )
                
                return device.to_json()
            except InvalidEntityException:
                return {
                    'error': 'Invalid device',
                }, 400

        @app.route('/api/device', methods = ['GET'])
        def get_devices():
            print(request.headers.get('Origin'))
            return DeviceStore.get_instance().select_all(json=True)

        @app.route('/api/device/<string:id>', methods = ['GET'])
        def get_device(id: str):
            try:
                return DeviceStore.get_instance().select_by_id(id, json=True)
            except EntityNotFoundException as e:
                return {
                    'error': 'Device not found',
                }, 404
                