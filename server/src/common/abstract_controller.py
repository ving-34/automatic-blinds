from __future__ import annotations
from flask import Flask
from abc import ABC

class AbstractController(ABC):

    @classmethod
    def add_routes(cls, app: Flask):
        pass