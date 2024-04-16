from datetime import datetime, timezone
from http import HTTPStatus
from flask import Response, request, jsonify, Blueprint
from swiftmail import mongo
from flask_jwt_extended import jwt_required, get_jwt_identity

router = Blueprint("search", __name__)


@router.get("/")
@jwt_required()
def filter_search():
    current_user = get_jwt_identity()
    data = request.get_json(force=True)

    if "group_name" in data:
        group_name = data["group_name"]
        pipeline = [
            {"$match": {"email": current_user, "group_name": group_name}},
            {
                "$lookup": {
                    "from": "mail",
                    "localField": "mail_group",
                    "foreignField": "from",
                    "as": "mails_from",
                }
            },
            {
                "$lookup": {
                    "from": "mail",
                    "let": {"labels": "$labels"},
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {
                                    "$ne": [
                                        {"$setIntersection": ["$labels", "$$labels"]},
                                        [],
                                    ]
                                }
                            }
                        }
                    ],
                    "as": "mails_with_labels",
                }
            },
            {
                "$project": {
                    "mails": {"$setUnion": ["$mails_from", "$mails_with_labels"]}
                }
            },
        ]

        resp = list(mongo.db.group.aggregate(pipeline))
        if resp:
            resp = resp[0]["mails"]

    elif "label" in data:
        label = data["label"]

        resp = list(
            mongo.db.mail.find(
                {
                    "$or": [{"from": current_user}, {"to": current_user}],
                    "labels": {"$in": [label]},
                }
            )
        )
    else:
        return Response(status=HTTPStatus.BAD_REQUEST)

    response = []

    for record in resp:
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
            rec["archieve"] = option["archieve"]
            rec["star"] = option["star"]
            rec["trash"] = option["trash"]
            rec["read"] = option["read"]
            rec["spam"] = option["spam"]
            rec["expires"] = option["expires"]
            response.append(rec)

    return jsonify(mails=response)
