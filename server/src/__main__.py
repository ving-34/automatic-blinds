from flask import Flask
from app import App
from mqtt.service import MQTTService

if __name__ == '__main__':
    flask_app = Flask(__name__)
    
    main_app = App(flask_app)
    
    mqtt_service = MQTTService.get_instance()
    mqtt_service.start()

    main_app.run(host='0.0.0.0', port=5001)
