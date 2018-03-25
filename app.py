import flask
import sqlalchemy
import json
import os
 

app = flask.Flask(__name__)

# Only enable Flask debugging if an env var is set to true
app.debug = os.environ.get('FLASK_DEBUG') in ['true', 'True']

# Get application version from env
#app = os.environ.get('APP_VERSION')

# Get cool new feature flag from env
enable_cool_new_feature = os.environ.get('ENABLE_COOL_NEW_FEATURE') in ['true', 'True']


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
