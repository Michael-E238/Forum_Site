from flask import Flask
from flask_jwt_extended import JWTManager
from config import Config
from database import db
from routes.auth import auth_blueprint

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth_blueprint, url_prefix='/api/auth')

if __name__ == "__main__":
    app.run(debug=True)