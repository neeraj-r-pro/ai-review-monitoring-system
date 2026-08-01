from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from .extensions import db


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    Migrate(app, db)

    from .routes import main
    app.register_blueprint(main)

    return app