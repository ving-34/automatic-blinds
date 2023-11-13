from __future__ import annotations
from flask import Flask, jsonify, request

from common.abstract_controller import AbstractController
from motor.motor_store import MotorStore
from motor.motor_service import  MotorService


class MotorController(AbstractController):
    @classmethod
    def add_routes(cls, app: Flask):
        @app.route('/api/motor/<string:motor_id>', methods = ['GET'])
        def get_motor(motor_id: str) -> str:
            return jsonify(MotorStore.get_instance().get_motor(motor_id))

        @app.route('/api/motor/<string:motor_id>/move', methods = ['POST'])
        def move_motor(motor_id: str):           
            body = request.json
            motor = MotorStore.get_instance().get_motor(motor_id)
            service = MotorService(motor)
            service.move_motor(body.get('steps', 0))
            
            return 'OK'
