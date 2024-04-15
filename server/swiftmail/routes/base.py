from flask import render_template, request, jsonify, Blueprint
from swiftmail import mongo
import datetime
from flask_jwt_extended import create_access_token

router = Blueprint("base", __name__)


@router.route("/", methods=["GET"])
def index():
    return render_template("base.html")


@router.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.get_json(force=True)

        email = data["email"]
        password = data["password"]
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


@router.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        data = request.get_json(force=True)
        users = mongo.db.users
        name = data["name"]
        email = data["email"]
        password = data["password"]
        mobile = data["mobile"]
        user = {"name": name, "email": email, "password": password, "mobile": mobile}
        userFind = (
            mongo.db.users.find_one({"email": email}) if users is not None else False
        )
        if userFind:
            return jsonify(msg="User already Exists")
        else:
            users.insert_one(user)
        print(user)

    return render_template("register.html")
