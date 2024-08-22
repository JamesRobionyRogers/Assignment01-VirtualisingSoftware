from supabase import create_client, Client
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Supabase client
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("ANON_KEY")
)

def register_user(data):
    email = data.get('email')
    password = data.get('password')
    try:
        # Register the user using Supabase
        response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })

        # Check if the registration was successful
        if response.user:
            return {
                "message": "User registered successfully",
                "user_id": response.user.id,
            }, 201
        else:
            return {"error": "Registration failed"}, 400

    except Exception as e:
        return {"error": str(e)}, 500


if __name__ == '__main__':
    payload = {
        "email": "test@example.com",
        "password": "securepassword123"
    }
    res, code = register_user(payload) 
    
    print(res, code)

    supabase.auth.sign_out()
