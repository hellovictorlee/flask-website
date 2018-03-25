import flask
import sqlalchemy
import json
import os

app = flask.Flask(__name__)

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route('/about')
def about():
    return flask.render_template('about.html')

@app.route('/post')
def post():
    return flask.render_template('post.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if flask.request.method == 'POST':
        return flask.render_template('index.html')
    else:
        return flask.render_template('contact.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')
