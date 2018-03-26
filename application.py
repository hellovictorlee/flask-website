import flask
import sqlalchemy
import json
import os

application = flask.Flask(__name__)

@application.route('/')
def index():
    return flask.render_template('index.html')

@application.route('/about')
def about():
    return flask.render_template('about.html')

@application.route('/post')
@application.route('/post/<page>')
def post(page=''):
    try:
        if any(page):
            return flask.render_template('post/' + page + '.html')
        else:
            return flask.render_template('post.html')
    except Exception:
        return "error!!"

@application.route('/contact', methods=['GET', 'POST'])
def contact():
    if flask.request.method == 'POST':
        return flask.render_template('index.html')
    else:
        return flask.render_template('contact.html')

if __name__ == '__main__':
    application.run(host='0.0.0.0')
