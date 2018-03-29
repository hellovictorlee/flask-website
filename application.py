from flask import Flask, render_template, request
from flask_session import Session
from tempfile import gettempdir
from models.database import init_db
from models.models import Contact
from models.database import db_session
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

application = Flask(__name__)
# avoid ddos attack
limiter = Limiter(
    application,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@application.teardown_appcontext
def shutdown_session(exception=None):
	db_session.remove()

# ensure responses aren't cached
if application.config["DEBUG"]:
    @application.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response

# configure session to use filesystem (instead of signed cookies)
application.config["SESSION_FILE_DIR"] = gettempdir()
application.config["SESSION_PERMANENT"] = False
application.config["SESSION_TYPE"] = "filesystem"
Session(application)




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
@limiter.limit("25 per day")
def contact():
    if request.method == 'POST':
        u = Contact(request.form.get('name'), request.form.get('email'), request.form.get('message'))
        db_session.add(u)
        db_session.commit()
        return render_template('index.html')
    else:
        return render_template('contact.html')

if __name__ == '__main__':
    application.run()
