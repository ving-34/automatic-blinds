from flask import Flask, request, jsonify

from common.abstract_controller import AbstractController
from device.device_service import DeviceService


class DeviceController(AbstractController):
    @classmethod
    def add_routes(cls, app: Flask):
        @app.route('/api/device/discover', methods = ['POST'])
        def discover_devices():
            DeviceService.find_devices()
            return 'OK'
