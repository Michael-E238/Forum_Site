from dotenv import dotenv_values

config = dotenv_values(".env")

class Config:
    JWT_SECRET_KEY = config.get('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = config.get('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False