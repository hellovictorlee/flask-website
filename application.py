from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

application = Flask(__name__)

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
