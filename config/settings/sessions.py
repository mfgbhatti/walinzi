"""Session Settings"""

from config.env import env


CSRF_USE_SESSIONS = env.bool("CSRF_USE_SESSIONS", default=False)
CSRF_COOKIE_HTTPONLY = env.bool(
    "CSRF_COOKIE_HTTPONLY", default=False
)  # this is the default, and should be kept this way
CSRF_COOKIE_NAME = env(
    "CSRF_COOKIE_NAME", default="XSRF-TOKEN"
)  # this is for angular default cockies name
CSRF_HEADER_NAME = env(
    "CSRF_HEADER_NAME", default="HTTP_X_XSRF_TOKEN"
)  # config for angular
CSRF_COOKIE_AGE = env.int("CSRF_COOKIE_AGE", default=43200)

LOCALHOST = [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
]

CSRF_TRUSTED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS", default=LOCALHOST)
