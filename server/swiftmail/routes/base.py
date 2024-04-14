from flask import render_template, flash, request, redirect, url_for, jsonify
from swiftmail import app, jwt, mongo
import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required


@app.route("/", methods=["GET"])
def index():
    return render_template("base.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        expires_delta = datetime.timedelta(minutes=30)
        user = mongo.db.users.find_one_or_404({"email": email})
        if user["email"] == email and user["password"] == password:
            access_token = create_access_token(
                identity=email, expires_delta=expires_delta
            )
            return jsonify(access_token=access_token)
        else:
            return jsonify({"msg": "Invalid credentials"}), 401

    return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        users = mongo.db.users
        name = request.form["name"]
        email = request.form["email"]
        password = request.form["password"]
        mobile = request.form["mobile"]
        user = {"name": name, "email": email, "password": password, "mobile": mobile}
        userFind = mongo.db.users.find_one({"email": email})
        if userFind:
            return jsonify(msg="User already Exists")
        else:
            users.insert_one(user)
        print(user)

    return render_template("register.html")



