from flask import request, jsonify, Blueprint, Response
from swiftmail import mongo
from datetime import datetime, timezone, timedelta
from flask_jwt_extended import jwt_required, get_jwt_identity
from swiftmail.utils.auth import user_exist
from http import HTTPStatus
from bson import ObjectId


from swiftmail.model.spam import detect


router = Blueprint("mail", __name__)



@router.post("/")
@jwt_required()
def send_mail():
    current_user = get_jwt_identity()

    data = request.get_json(force=True)

    if not user_exist(current_user):
        return jsonify(msg=f"User {current_user} not found"), 400

    for user in data["to"]:
        if not user_exist(user):
            return jsonify(msg=f"User {user} not found"), 400


    isSpam = detect(data["body"]) or detect(data["subject"])



    record = mongo.db.mail.insert_one(
        {
            "from": current_user,
            "to": data["to"],
            "subject": data["subject"],
            "body": data["body"],
            "labels": data["labels"],
            "date": datetime.now(timezone.utc),
        }
    )

    mongo.db.option.insert_one(
        {
            "email": current_user,
            "mail_id": record.inserted_id,
            "archive": False,
            "star": False,
            "trash": False,
            "read": True,
            "spam": isSpam,
            "expires": None,
        }
    )

    mongo.db.option.insert_many(
        [
            {
                "email": email,
                "mail_id": record.inserted_id,
                "archive": False,
                "star": False,
                "trash": False,
                "read": False,
                "spam": isSpam,
                "expires": None,
            }
            for email in data["to"]
        ]
    )

    return (
        Response(status=HTTPStatus.CREATED)
        if record.acknowledged
        else Response(status=HTTPStatus.BAD_REQUEST)
    )


@router.get("/")
@jwt_required()
def get_mails():
    current_user = get_jwt_identity()

    records = mongo.db.mail.find(
        {"$or": [{"from": current_user}, {"to": {"$in": [current_user]}}]}
    )

    response = []
    labels = set()

    for record in records:
        labels.update(record["labels"])
        options = list(
            mongo.db.option.find({"email": current_user, "mail_id": record["_id"]})
        )
        for option in options:
            if option["trash"] and option["expires"].replace(
                tzinfo=timezone.utc
            ) <= datetime.now(timezone.utc):
                continue
            rec = {}
            rec["mid"] = str(record["_id"])
            rec["oid"] = str(option["_id"])
            rec["from"] = record["from"]
            rec["to"] = record["to"]
            rec["subject"] = record["subject"]
            rec["body"] = record["body"]
            rec["labels"] = record["labels"]
            rec["date"] = record["date"]
            rec["archive"] = option["archive"]
            rec["star"] = option["star"]
            rec["trash"] = option["trash"]
            rec["read"] = option["read"]
            rec["spam"] = option["spam"]
            rec["expires"] = option["expires"]
            response.append(rec)

    return jsonify(mails=response, labels=list(labels))


@router.put("/")
@jwt_required()
def option_toggle():
    current_user = get_jwt_identity()
    data = request.get_json(force=True)
    mail_id = data["mid"]
    option_id = data["oid"]
    option = data["option"]

    allowed_options = ["archive", "star", "trash", "read", "spam"]

    if option not in allowed_options:
        return Response(status=HTTPStatus.BAD_REQUEST)

    if option == "trash":
        record = mongo.db.option.find_one(
            {
                "email": current_user,
                "mail_id": ObjectId(mail_id),
                "_id": ObjectId(option_id),
                "$or": [
                    {"expires": {"$exists": False}},
                    {"expires": {"$eq": None}},
                    {"expires": {"$gt": datetime.now(timezone.utc)}},
                ],
            }
        )

        if record is None:
            return Response(status=HTTPStatus.BAD_REQUEST)

        expires = None
        if not record["trash"]:
            expires = datetime.now(timezone.utc) + timedelta(days=30)

        mongo.db.option.update_one(
            {
                "email": current_user,
                "mail_id": ObjectId(mail_id),
                "_id": ObjectId(option_id),
            },
            [
                {"$set": {f"{option}": {"$not": f"${option}"}}},
                {"$set": {"expires": expires}},
            ],
        )

        return Response(status=HTTPStatus.OK)

    mongo.db.option.update_one(
        {
            "email": current_user,
            "mail_id": ObjectId(mail_id),
            "_id": ObjectId(option_id),
        },
        [{"$set": {f"{option}": {"$not": f"${option}"}}}],
    )
    return Response(status=HTTPStatus.OK)
