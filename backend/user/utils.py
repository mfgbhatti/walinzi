"""
activation key generation and validation
"""
import time
import secrets
import string


def generate_activation_key():
    alphabets = string.ascii_letters + string.digits
    random_part = "".join(secrets.choice(alphabets) for i in range(32))
    expiration_time = int(time.time()) + (1 * 24 * 60 * 60)  # 1 day
    return f"{expiration_time}-{random_part}"


def is_activation_key_valid(activation_key):
    parts = activation_key.split("-")
    if len(parts) != 2:
        return False
    expiration_time = int(parts[0])
    current_time = int(time.time())
    if expiration_time < current_time:
        return False
    return True
