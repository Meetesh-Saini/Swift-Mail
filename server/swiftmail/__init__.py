from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "4983298f42h8r7cbr20nb9"
app.config['SECRET_KEY'] = "dingdingdingdingding"
app.config["MONGO_URI"] = "mongodb://localhost:27017/swiftmail"

jwt = JWTManager(app)

mongo = PyMongo(app)

from swiftmail.routes import *
