from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from tempfile import gettempdir

application = Flask(__name__)

# ensure responses aren't cached
if application.config["DEBUG"]:
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response

# configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = gettempdir()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# database
db = SQLAlchemy(application)

class User(db.Model):
    username = db.Column(db.String(80), unique=True)
    pw_hash = db.Column(db.String(80))


@application.route('/')
def index():
    return render_template('index.html')

@application.route('/about')
def about():
    return render_template('about.html')

@application.route('/post')
@application.route('/post/<page>')
def post(page=''):
    try:
        if any(page):
            return render_template('post/' + page + '.html')
        else:
            return render_template('post.html')
    except Exception:
        return "error!!"

@application.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        return render_template('index.html')
    else:
        return render_template('contact.html')

if __name__ == '__main__':
    application.run()
