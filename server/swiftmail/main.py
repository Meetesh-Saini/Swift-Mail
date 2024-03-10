from fastapi import FastAPI
from swiftmail.routes import base_router


def get_application() -> FastAPI:
    application = FastAPI()

    application.include_router(base_router)

    return application


app = get_application()
