"""
The order of first three lines is fixed, should change them
"""
from flask import Flask
application = Flask('project')
from project.controllers import *
