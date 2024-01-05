from functools import wraps
import jwt, os
from flask import request


# A decorator for requiring token authentication
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return {
                "message": "Authentication Token is missing",
                "data": None,
                "error": "Unauthorized"
            }, 401
        try:
            data = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=["HS512"])
        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }, 500

        return f(*args, **kwargs)

    return decorated
