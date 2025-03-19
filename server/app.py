from.routes.auth import auth_blueprint

app.register_blueprint(auth_blueprint, url_prefix='/api/auth')