from healthcheck import HealthCheck, EnvironmentDump
from project import application

# wrap the flask app and give a heathcheck url
health = HealthCheck(application, "/healthcheck")
