"""
Django's settings for production environment.
"""

from config.env import env
from config.settings.base import *  # noqa

DEBUG = env.bool("DJANGO_DEBUG", default=False)

SECRET_KEY = env("SECRET_KEY", default="000000000000000000000000000000000000000000000000000000000000000")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])

CORS_ALLOWED_ORIGINS = False
CORS_ORIGIN_WHITELIST = env.list("CORS_ORIGIN_WHITELIST", default=[])

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

APP_DOMAIN = env("APP_DOMAIN", default="http://localhost:8000")

WSGI_APPLICATION = "config.wsgi.application"
