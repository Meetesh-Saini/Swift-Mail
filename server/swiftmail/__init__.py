import os
from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

load_dotenv()

mongo = PyMongo()
jwt = JWTManager()

from swiftmail.routes import *


def create_app():

    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = os.environ.get(
        "JWT_SECRET_KEY", os.urandom(16).hex()
    )
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", os.urandom(16).hex())
    app.config["MONGO_URI"] = os.environ["MONGO_URI"]

    # Register blueprints
    app.register_blueprint(base_router)
    app.register_blueprint(mail_router, url_prefix="/mail")

    # Initialising extentions
    jwt.init_app(app)
    mongo.init_app(app)

    return app
