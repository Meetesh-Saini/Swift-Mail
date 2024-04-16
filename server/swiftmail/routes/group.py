from flask import request, jsonify, Blueprint, Response
from swiftmail import mongo
from flask_jwt_extended import jwt_required, get_jwt_identity
from http import HTTPStatus

router = Blueprint("group", __name__)


@router.post("/")
@jwt_required()
def add_group():
    data = request.get_json(force=True)
    current_user = get_jwt_identity()

    key_group = data["key_group"]
    group_name = data["group_name"]
    mail_ids = data["emails"]
    labels = data["labels"]

    mongo.db.group.update_one(
        {"email": current_user, "group_name": key_group},
        {
            "$set": {
                "email": current_user,
                "group_name": group_name,
                "mail_group": mail_ids,
                "labels": labels,
            }
        },
        upsert=True,
    )

    return Response(status=HTTPStatus.OK)


@router.get("/")
@jwt_required()
def get_group():
    current_user = get_jwt_identity()

    groups = mongo.db.group.find({"email": current_user})

    if groups is None:
        groups = []
    else:
        groups = list(groups)

    for group in groups:
        group.pop("_id")
        group.pop("email")

    return jsonify(groups=groups)
