""" Simple jwt config"""

from datetime import timedelta
from config.env import env

# Default to 1 days
JWT_EXPIRATION_DELTA_SECONDS = env("JWT_EXPIRATION_DELTA_SECONDS", default=60 * 60 * 24 * 1)

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(seconds=JWT_EXPIRATION_DELTA_SECONDS),
}