from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Sample route
@app.route('/')
def hello():
    return jsonify({"message": "Hello from the Job Tracker API!"})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)