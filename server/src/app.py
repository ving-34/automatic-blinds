from flask_cors import CORS
from router import Router

class App:
    def __init__(self, app):
        self.app = app
        CORS(self.app)
        Router(self.app)

    def run(self, host=None, port=None):
        self.app.run(host=host, port=port, debug=True)
