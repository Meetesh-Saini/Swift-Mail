from flask import request, jsonify, Blueprint, Response
from swiftmail import mongo
from datetime import datetime, timezone
from flask_jwt_extended import jwt_required, get_jwt_identity
from swiftmail.utils.auth import user_exist

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
            "archieve": False,
            "star": False,
            "trash": False,
            "read": True,
            "spam": False,
        }
    )

    mongo.db.option.insert_many(
        [
            {
                "email": email,
                "mail_id": record.inserted_id,
                "archieve": False,
                "star": False,
                "trash": False,
                "read": False,
                "spam": False,
            }
            for email in data["to"]
        ]
    )

    return Response(status=201) if record.acknowledged else Response(status=400)


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
            rec = {}
            rec["from"] = record["from"]
            rec["to"] = record["to"]
            rec["subject"] = record["subject"]
            rec["body"] = record["body"]
            rec["labels"] = record["labels"]
            rec["date"] = record["date"]
            rec["archieve"] = option["archieve"]
            rec["star"] = option["star"]
            rec["trash"] = option["trash"]
            rec["read"] = option["read"]
            rec["spam"] = option["spam"]
            response.append(rec)

    return jsonify(mails=response, labels=list(labels))
