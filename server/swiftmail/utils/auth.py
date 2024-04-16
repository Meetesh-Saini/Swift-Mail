from swiftmail import mongo


def user_exist(email):
    return mongo.db.users.find_one({"email": email}) is not None
