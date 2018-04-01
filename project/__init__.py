# -*- coding: utf-8 -*-
__version__ = '0.1'
from flask import Flask
application = Flask('project')
from project.controllers import *
