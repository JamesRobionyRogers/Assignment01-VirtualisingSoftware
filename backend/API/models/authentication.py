from functools import wraps
from flask import request  # Change this import based on your web framework
from config import Config
import requests

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Extract token from the 'Authorization' header
        token = request.headers.get('Authorization')
        if not token:
            return {'message': 'Authentication token is missing'}, 401
        
        # Remove 'Bearer ' prefix if present
        if token.startswith('Bearer '):
            token = token[7:]

        try:
            result = validate_token(token)
            if not result['valid']:
                return {'message': 'Invalid authentication token'}, 401
        except Exception as e:
            return {'message': str(e)}, 401
        
        # Call the original function with the arguments
        return f(*args, token_user_id = result['user']['id'], **kwargs)
    
    return decorated

def validate_token(access_token):
    url = f"{Config.SUPABASE_URL}/auth/v1/user"
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'apikey': Config.SUPABASE_KEY
    }

    try:
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return {'valid': True, 'user': response.json()}
        else:
            # Handle cases where the response might not have a JSON body
            return {'valid': False, 'message': response.json().get('message', 'Invalid token')}
    except requests.RequestException as e:
        return {'valid': False, 'message': str(e)}
